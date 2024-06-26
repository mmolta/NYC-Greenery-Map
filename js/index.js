import makeMap from './map/map.js'
import { getSrc, srcURLs } from './map/mapSources.js'
import { mapLayers, layersKey } from './map/mapLayers.js'
import handleModal from './modal.js'
import { handleBoroughsForm } from './forms.js'
import { makePopup, addPopup, makeThumbHoverPopup, makeParkHoverPopup, makeThumbClickPopup, makeParkClickPopup } from './map/popup.js'
import { fetchFeatures, fetchOpenData } from './map/mapFetch.js'
import { filterBoroughs, borobbox, positionMap, getRendered, clearActiveLayers } from './map/mapEvents.js'
import { makeCharts, updateCharts } from './charts/charts.js'
import defaultData from './charts/chartsDefaults.js'

const modal = document.getElementById('modal')
const modalToggle = document.getElementById('modal-toggle')
const closeModal = document.getElementById('close-modal')
const boroughForm = document.getElementById('boros-form')
const totalGardens = document.getElementById('gardens-totals')
const totalTrees = document.getElementById('trees-totals')
const totalParks = document.getElementById('parks-totals')
const treesChart = document.getElementById('trees-chart')

let queryTrees = true
const chartEls = {
    trees: treesChart
}

const map = makeMap()
const hoverPopup = makePopup()
const clickPopup = makePopup()
const charts = makeCharts(defaultData, chartEls)
const query = fetchFeatures(0)

query.then(features => {
    totalGardens.textContent = features.thumb.totals.toLocaleString()
    totalParks.textContent = features.parks.totals.toLocaleString()    
})

map.on('load', () => {
    const spinner = map['_container'].querySelector('.lds-ring')

    // add gardens symbol img
    map.loadImage('./img/gthumbgarden.png', (error, image) => {
        if (error) throw error;
        map.addImage('gthumbgarden', image);
    });

    for(let [key, value] of Object.entries(srcURLs.openData)) {
        getSrc(value.url).then(src => {
            if(src) {
                map.addSource(key, {
                    type: value.type,
                    data: value.url
                })

                layersKey[key].forEach(layer => map.addLayer(mapLayers[layer], mapLayers[layer].order))

            } else {
                console.log(`failed to fetch ${key} at url: ${src.url}`)
            }
        })
    }

    // overkill but makes it easy to add more tiles if I want to
    for(let [key, value] of Object.entries(srcURLs.tiles)) {
        map.addSource(key, {
            type: value.type,
            url: value.url
        })
    
        layersKey[key].forEach(layer => map.addLayer(mapLayers[layer], 'waterway-label'))
    }

    // map events
    map.on('mouseenter', 'thumb', e => {
        map.getCanvas().style.cursor = 'pointer'

        const lngLat = e.lngLat
        const html = makeThumbHoverPopup(e.features[0].properties)

        addPopup(map, lngLat, html, hoverPopup)
    })

    map.on('mouseenter', 'parks', e => {
        map.getCanvas().style.cursor = 'pointer'

        const lngLat = e.lngLat
        const html = makeParkHoverPopup(e.features[0].properties)

        addPopup(map, lngLat, html, hoverPopup)
    })

    map.on('mouseleave', 'parks', () => {
        map.getCanvas().style.cursor = ''
        hoverPopup.remove()
    })

    map.on('mouseleave', 'thumb', () => {
        map.getCanvas().style.cursor = ''
        hoverPopup.remove()
    })

    map.on('click', 'thumb', e => {
        // clear any active layers
        clearActiveLayers(map)

        const lngLat = e.lngLat
        const props = e.features[0].properties
        const url = `https://data.cityofnewyork.us/resource/xqbk-beh5.json?parksid=${props.parksid}`
        let html;

        fetchOpenData(url).then(response => {
            if(response.length) {
                html = makeThumbClickPopup(props, response[0])
            } else {
                html = makeThumbClickPopup(props, false)
            }

            addPopup(map, lngLat, html, clickPopup)
            hoverPopup.remove()
        })

        // add active layer
        map.setFilter('thumbActive', ['==', 'gardenname', props.gardenname])

        map.flyTo({
            center: lngLat,
            speed: 1
        })
    })

    map.on('click', 'parks', e => {
        // clear any active layers
        clearActiveLayers(map)

        const lngLat = e.lngLat
        const props = e.features[0].properties
        const html = makeParkClickPopup(props)

        addPopup(map, lngLat, html, clickPopup)

        // add active layer
        map.setFilter('parksActive', ['==', 'name311', props.name311])

        map.flyTo({
            center: lngLat,
            speed: 1
        })
    })

    boroughForm.onchange = e => {
        spinner.classList.add('lds-ring-active')
        updateCharts(defaultData, charts)

        const selectedBoro = handleBoroughsForm(e.target)
        const activeBoro = selectedBoro.value
        const filters = filterBoroughs(activeBoro)

        // filter
        map.setFilter('thumb', filters.thumb)
        map.setFilter('thumbIcon', filters.thumb)
        map.setFilter('parks', filters.parks)
        map.setFilter('tree-lines', filters.trees)
        map.setFilter('boroughs', filters.boro)

        // zoom to bounds
        if(activeBoro == 0) {
            const defaultCoords = positionMap()

            map.flyTo({
                center: defaultCoords.center,
                zoom: defaultCoords.zoom
            })
        } else {
            map.fitBounds(borobbox[activeBoro], {
                padding: {
                    top: 25,
                    bottom: 25,
                    left: 25,
                    right: 25
                }
            })
        }

        totalTrees.textContent = 'calculating...'
        totalGardens.textContent = 'calculating...'
        totalParks.textContent = 'calculating...'

        queryTrees = true

        // @TODO: finish update
        const query = fetchFeatures(activeBoro)

        query.then(features => {
            totalGardens.textContent = features.thumb.totals.toLocaleString()
            totalParks.textContent = features.parks.totals.toLocaleString()    
        })

    }

    clickPopup.on('close', () => clearActiveLayers(map))
})


// loading spinner 
map.on('idle', () => {
    const spinner = map['_container'].querySelector('.lds-ring')
    spinner.classList.remove('lds-ring-active')

    if(queryTrees) {
        const features = map.queryRenderedFeatures({
            layers: ['tree-lines']
        })

        const treeData = getRendered(features)

        updateCharts(treeData, charts)
        
        totalTrees.textContent = treeData.totals == 0 ? 'n/a' : treeData.totals.toLocaleString()
        queryTrees = false
    }
})


// modal
handleModal(modal, modalToggle, closeModal)
