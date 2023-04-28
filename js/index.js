import makeMap from './map/map.js'
import { getSrc, srcURLs } from './map/mapSources.js'
import { mapLayers, layersKey } from './map/mapLayers.js'
import handleModal from './modal.js'
import handleForms from './forms.js'
import { makePopup, addPopup, makeThumbHoverPopup, makeParkHoverPopup, makeThumbClickPopup, makeParkClickPopup } from './map/popup.js'
import { fetchParkDetails } from './map/mapFetch.js'


const modal = document.getElementById('modal')
const modalToggle = document.getElementById('modal-toggle')
const closeModal = document.getElementById('close-modal')
const toggleForm = document.querySelectorAll('.toggle-form')


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

    // @TODO: re-incorporate
    // set default form state
    // let activeInputs = handleForms('input', inputs, map)
    // let activeSelects = handleForms('select', selects, map)
    // let allActiveToggles = [... activeSelects, ... activeInputs]

    // handle simple toggles - layers on/off and corresponding legend items on/off
    // toggleForm.onchange = () => {
    //     activeInputs = handleForms('input', inputs, map)
    //     activeSelects = handleForms('select', selects, map)
    //     allActiveToggles = [... activeSelects, ... activeInputs]
    // }
})


// loading spinner 
map.on('idle', () => {
    const spinner = map['_container'].querySelector('.lds-ring')
    spinner.classList.remove('lds-ring-active')
})


// modal
handleModal(modal, modalToggle, closeModal)
