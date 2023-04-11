import makeMap from './map/map.js'
import { getSrc, srcURLs } from './map/mapSources.js'
import mapLayers from './map/mapLayers.js'
import handleModal from './modal.js'
import handleForms from './forms.js'
import { makePopup, makePopupContent } from './map/popup.js'
import { fetchParkDetails } from './map/mapUtils.js'


const modal = document.getElementById('modal')
const modalToggle = document.getElementById('modal-toggle')
const closeModal = document.getElementById('close-modal')
const toggleForm = document.getElementById('toggle-form')
const inputs = toggleForm.querySelectorAll('input')
const selects = toggleForm.querySelectorAll('select')


// map
const map = makeMap()
const hoverPopup = makePopup()
const clickPopup = makePopup()

map.on('load', () => {
    // @TODO: load source more efficiently
    getSrc(srcURLs.thumb).then(data => {
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
    // @TODO: refactor events into functions
    map.on('mouseenter', 'thumb', e => {
        map.getCanvas().style.cursor = 'pointer'

        const allProps = e.features[0].properties
        const props = [
            {
                display: '',
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
                display: '',
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

    map.on('click', 'thumb', e => {
        const lngLat = e.lngLat
        const allProps = e.features[0].properties
        const id = allProps.parksid
        const gardenName = allProps.gardenname

        // fetch id from parksID endpoint and put into popup
        fetchParkDetails(id).then(response => {
            let props;

            if(response.length) {
                const data = response[0]

                props = [
                    {
                        display: '',
                        prop: gardenName
                    },
                    {
                        display: 'Open to public',
                        prop: data.openlawnorcommunalarea
                    },
                    {
                        display: 'Garden Area',
                        prop: data.totalsidewalkarea + ' square feet'
                    },
                    {
                        display: 'Composting',
                        prop: data.composting
                    },
                    {
                        display: 'CSA Pick Site',
                        prop: data.csapickup
                    },
                    {
                        display: 'Solar Panels',
                        prop: data.solarpanels
                    },
                    {
                        display: 'Is Food Grown Here?',
                        prop: data.food
                    },
                    {
                        display: 'Is There a Pond?',
                        prop: data.pond
                    }
                ]
            } else {
                props = [
                    {
                        display: '',
                        prop: gardenName
                    },
                    {
                        display: 'Details for this park are unavailable',
                        prop: ''
                    }
                ]
            }
    
            makePopupContent(map, lngLat, props, clickPopup)
        })
    })

    map.on('click', 'thumb-points', e => {
        const lngLat = e.lngLat
        const allProps = e.features[0].properties
        const id = allProps.parksid
        const gardenName = allProps.gardenname

        // fetch id from parksID endpoint and put into popup
        fetchParkDetails(id).then(response => {
            let props;

            if(response.length) {
                const data = response[0]

                props = [
                    {
                        display: '',
                        prop: gardenName
                    },
                    {
                        display: 'Open to public',
                        prop: data.openlawnorcommunalarea
                    },
                    {
                        display: 'Garden Area',
                        prop: data.totalsidewalkarea + ' square feet'
                    },
                    {
                        display: 'Composting',
                        prop: data.composting
                    },
                    {
                        display: 'CSA Pick Site',
                        prop: data.csapickup
                    },
                    {
                        display: 'Solar Panels',
                        prop: data.solarpanels
                    },
                    {
                        display: 'Is Food Grown Here?',
                        prop: data.food
                    },
                    {
                        display: 'Is There a Pond?',
                        prop: data.pond
                    }
                ]
            } else {
                props = [
                    {
                        display: '',
                        prop: gardenName
                    },
                    {
                        display: 'Details for this park are unavailable',
                        prop: ''
                    }
                ]
            }
    
            makePopupContent(map, lngLat, props, clickPopup)
        })
    })

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
