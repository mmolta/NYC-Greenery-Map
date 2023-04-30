import makeMap from './map/map.js'
import { getSrc, srcURLs } from './map/mapSources.js'
import { mapLayers, layersKey } from './map/mapLayers.js'
import handleModal from './modal.js'
import { handleBoroughsForm } from './forms.js'
import { makePopup, addPopup, makeThumbHoverPopup, makeParkHoverPopup, makeThumbClickPopup, makeParkClickPopup } from './map/popup.js'
import { fetchParkDetails } from './map/mapFetch.js'
import { filterBoroughs, borobbox, positionMap, getRendered } from './map/mapEvents.js'
import makeCharts from './charts/charts.js'

let triggerDataChange = true

const modal = document.getElementById('modal')
const modalToggle = document.getElementById('modal-toggle')
const closeModal = document.getElementById('close-modal')
const boroughForm = document.getElementById('boros-form')
const boundsHeader = document.getElementById('bounds')
const totalGardens = document.getElementById('gardens-totals')
const totalTrees = document.getElementById('trees-totals')
const totalParks = document.getElementById('parks-totals')
const treesChart = document.getElementById('trees-chart')

const charts = {
    trees: treesChart
}


const map = makeMap()
const hoverPopup = makePopup()
const clickPopup = makePopup()


map.on('load', () => {
    const spinner = map['_container'].querySelector('.lds-ring')

    for(let [key, value] of Object.entries(srcURLs.openData)) {
        getSrc(value.url).then(src => {
            if(src) {
                map.addSource(key, {
                    type: value.type,
                    data: value.url
                })

                layersKey[key].forEach(layer => map.addLayer(mapLayers[layer]))

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

    map.on('mouseenter', 'thumb-points', e => {
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

    map.on('mouseleave', 'thumb-points', () => {
        map.getCanvas().style.cursor = ''
        hoverPopup.remove()
    })

    map.on('click', 'thumb', e => {
        const lngLat = e.lngLat
        const props = e.features[0].properties
        const id = props.parksid
        let html;

        fetchParkDetails(id).then(response => {
            if(response.length) {
                html = makeThumbClickPopup(props, response[0])
            } else {
                html = makeThumbClickPopup(props, false)
            }

            addPopup(map, lngLat, html, clickPopup)
            hoverPopup.remove()
        })

        // @TODO: hack lngLat to slightly offset the popup so it doesn't collide with 
        // the main overlay bar
        map.flyTo({
            center: lngLat,
            zoom: 16,
            speed: 0.5
        })
    })

    map.on('click', 'thumb-points', e => {
        const lngLat = e.lngLat
        const logisticProps = e.features[0].properties
        const id = logisticProps.parksid
        let html;

        fetchParkDetails(id).then(response => {
            if(response.length) {
                html = makeThumbClickPopup(logisticProps, response[0])
            } else {
                html = makeThumbClickPopup(logisticProps, false)
            }

            addPopup(map, lngLat, html, clickPopup)
            hoverPopup.remove()
        })

        map.flyTo({
            center: lngLat,
            zoom: 16,
            speed: 0.5
        })
    })

    map.on('click', 'parks', e => {
        const lngLat = e.lngLat
        const html = makeParkClickPopup(e.features[0].properties)

        addPopup(map, lngLat, html, clickPopup)

        map.flyTo({
            center: lngLat,
            zoom: 16,
            speed: 0.5
        })
    })

    boroughForm.onchange = e => {
        spinner.classList.add('lds-ring-active')


        const selectedBoro = handleBoroughsForm(e.target)
        const activeBoro = selectedBoro.value
        const newBoundsHeader = selectedBoro.textContent
        const filters = filterBoroughs(activeBoro)
        

        // filter
        map.setFilter('thumb', filters.thumb)
        map.setFilter('thumbPoints', filters.thumb)
        map.setFilter('parks', filters.parks)
        map.setFilter('tree-lines', filters.trees)
        map.setFilter('boroughs', filters.boro)

        // zoom to bounds
        if(activeBoro == '0') {
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

        boundsHeader.textContent = newBoundsHeader
        totalTrees.textContent = 'calculating...'
        totalGardens.textContent = 'calculating...'
        totalParks.textContent = 'calculating...'

        triggerDataChange = true
    }
})


// loading spinner 
map.on('idle', () => {

        /*
            @NOTE: default state w/default view
            cuts off southenr tip of staten island
                fitting the whole thing in the viewport cuts off features
                via zoom
                pass this bbox: [[-74.317017,40.489017],[-73.708649,40.948830]]
                for default or all jawns
                    ^ this didn't work. can't query outside viewport
            287 Gardens
            612,934 Street Trees
            675 Parks
        */

    // call on first pass and when 'idle' is result of a form change
    if(triggerDataChange) {
        const features = map.queryRenderedFeatures({
            layers: ['thumb', 'parks', 'tree-lines']
        })
        
        const data = getRendered(features)
        makeCharts(data.charts, charts)

        totalTrees.textContent = data.totals.trees.toLocaleString()
        totalGardens.textContent = data.totals.thumb.toLocaleString()
        totalParks.textContent = data.totals.parks.toLocaleString()

        triggerDataChange = false
    }

    const spinner = map['_container'].querySelector('.lds-ring')
    spinner.classList.remove('lds-ring-active')
})


// modal
handleModal(modal, modalToggle, closeModal)
