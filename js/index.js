import makeMap from './map/map.js'
import { getSrc, srcURLs } from './map/mapSources.js'
import { mapLayers, layersKey } from './map/mapLayers.js'
import handleModal from './modal.js'
import { handleBoroughsForm } from './forms.js'
import { makePopup, addPopup, makeThumbHoverPopup, makeParkHoverPopup, makeThumbClickPopup, makeParkClickPopup } from './map/popup.js'
import { fetchParkDetails } from './map/mapFetch.js'
import { filterBoroughs, borobbox, positionMap } from './map/mapEvents.js'


const modal = document.getElementById('modal')
const modalToggle = document.getElementById('modal-toggle')
const closeModal = document.getElementById('close-modal')
const boroughForm = document.getElementById('boros-form')


const map = makeMap()
const hoverPopup = makePopup()
const clickPopup = makePopup()

map.on('load', () => {
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
        const activeBoro = handleBoroughsForm(e.target)
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

        // queryFeatures
        // features blueprint:

        // make the query and the commented out 
        // loop below 1 function 
            // call it on form end
            // call it after initial render
        const features = map.queryRenderedFeatures({
            layers: ['thumb', 'parks', 'tree-lines']
        })

        /*
            const data = {
                const parks = {
                    Landmark Park: 0,
                    //
                }
                const trees = {
                    Active: 0,
                    // etc
                }
            }
            
            // only push relevant props
            features.forEach(feature => {
                data[feature.source].push(props)
            })

            // get total length of each jawn for totals
            // get length of each key/value pair for charts
            */
    }
})


// loading spinner 
map.on('idle', () => {
    const spinner = map['_container'].querySelector('.lds-ring')
    spinner.classList.remove('lds-ring-active')
})


// modal
handleModal(modal, modalToggle, closeModal)
