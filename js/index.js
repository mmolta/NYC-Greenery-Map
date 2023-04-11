import makeMap from './map/map.js'
import { getSrc, srcURLs } from './map/mapSources.js'
import mapLayers from './map/mapLayers.js'
import handleModal from './modal.js'
import handleForms from './forms.js'
import handleLegend from './legend.js'


const modal = document.getElementById('modal')
const modalToggle = document.getElementById('modal-toggle')
const closeModal = document.getElementById('close-modal')
const legendContainer = document.getElementById('legend-container')
const toggleForm = document.getElementById('toggle-form')
const inputs = toggleForm.querySelectorAll('input')
const selects = toggleForm.querySelectorAll('select')


// map
const map = makeMap()

// sources


map.on('load', () => {
    getSrc(srcURLs.thumb).then(data => {
        console.log(data)
        if(data) {
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

    // on click, fetch the Site Visits API and create a popup with the informaiton

    // set default form state
    let activeInputs = handleForms('input', inputs, map)
    let activeSelects = handleForms('select', selects, map)
    let allActiveToggles = [... activeSelects, ... activeInputs]

    handleLegend(allActiveToggles, legendContainer)

    // handle simple toggles - layers on/off and corresponding legend items on/off
    toggleForm.onchange = () => {
        activeInputs = handleForms('input', inputs, map)
        activeSelects = handleForms('select', selects, map)
        allActiveToggles = [... activeSelects, ... activeInputs]

        handleLegend(allActiveToggles, legendContainer)
    }
})

// loading spinner 
map.on('idle', () => {
    const spinner = map['_container'].querySelector('.lds-ring')
    spinner.classList.remove('lds-ring-active')
})


// modal
handleModal(modal, modalToggle, closeModal)
