import makeMap from './map/map.js'
import { getSrc, srcURLs } from './map/mapSources.js'
import mapLayers from './map/mapLayers.js'
import handleModal from './modal.js'
import handleForms from './forms.js'
import { makePopup, makePopupContent } from './map/popup.js'

const modal = document.getElementById('modal')
const modalToggle = document.getElementById('modal-toggle')
const closeModal = document.getElementById('close-modal')
const toggleForm = document.getElementById('toggle-form')
const inputs = toggleForm.querySelectorAll('input')
const selects = toggleForm.querySelectorAll('select')


// map
const map = makeMap()
const hoverPopup = makePopup()

map.on('load', () => {
    // @TODO: load source more efficiently
    getSrc(srcURLs.thumb).then(data => {
        if(data) {
            console.log(data)
            map.addSource('thumb', {
                'type': 'geojson',
                data: data
            })
    
            map.addLayer(mapLayers.thumb)
            map.addLayer(mapLayers.thumbPoints)
        } else {
            // @TODO: more graceful way to let users know data source failed to load
            alert('thumb Layer failed to load!')
        }
    })

    // add map events here (click, mousemove, etc)
    // on mousemove, show the name of the community garden
    map.on('mouseenter', 'thumb', e => {
        map.getCanvas().style.cursor = 'pointer'

        const allProps = e.features[0].properties
        const props = [
            {
                display: 'Garden Name',
                prop: allProps.gardenname
            }
        ]
        const lngLat = e.lngLat

        makePopupContent(map, lngLat, props, hoverPopup)
    })

    map.on('mouseenter', 'thumb-points', e => {
        map.getCanvas().style.cursor = 'pointer'

        const allProps = e.features[0].properties
        const props = [
            {
                display: 'Garden Name',
                prop: allProps.gardenname
            }
        ]
        const lngLat = e.lngLat

        makePopupContent(map, lngLat, props, hoverPopup)
    })

    map.on('mouseleave', 'thumb', () => {
        map.getCanvas().style.cursor = ''
        hoverPopup.remove()
    })

    map.on('mouseleave', 'thumb-points', () => {
        map.getCanvas().style.cursor = ''
        hoverPopup.remove()
    })

    // map.on('click', 'thumb', e => {
    //     // fetch data from id
    //     const id = e.properties.parksid
        
    //     // fetch id from parksID endpoint and put into popup
    //     const details = fetchDetails(id)
    // })

    // on click, fetch the Site Visits API and create a popup with the informaiton
    map.on
    // set default form state
    let activeInputs = handleForms('input', inputs, map)
    let activeSelects = handleForms('select', selects, map)
    let allActiveToggles = [... activeSelects, ... activeInputs]

    // handle simple toggles - layers on/off and corresponding legend items on/off
    toggleForm.onchange = () => {
        activeInputs = handleForms('input', inputs, map)
        activeSelects = handleForms('select', selects, map)
        allActiveToggles = [... activeSelects, ... activeInputs]
    }
})

// loading spinner 
map.on('idle', () => {
    const spinner = map['_container'].querySelector('.lds-ring')
    spinner.classList.remove('lds-ring-active')
})


// modal
handleModal(modal, modalToggle, closeModal)
