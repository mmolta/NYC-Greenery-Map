import makeMap from './map/map.js'
import { getSrc, srcURLs } from './map/mapSources.js'
import { mapLayers, layersKey } from './map/mapLayers.js'
import handleModal from './modal.js'
import handleForms from './forms.js'
import { makePopup, makePopupContent } from './map/popup.js'
import { fetchParkDetails } from './map/mapFetch.js'
import { hoverThumbLayer } from './map/mapEvents.js'


const modal = document.getElementById('modal')
const modalToggle = document.getElementById('modal-toggle')
const closeModal = document.getElementById('close-modal')
const toggleForm = document.getElementById('toggle-form')
const inputs = toggleForm.querySelectorAll('input')
const selects = toggleForm.querySelectorAll('select')


const map = makeMap()
const hoverPopup = makePopup()
const clickPopup = makePopup()

map.on('load', () => {
    for(let [key, value] of Object.entries(srcURLs)) {
        getSrc(value).then(data => {
            if(data) {
                map.addSource(key, {
                    type: 'geojson',
                    data: data
                })

                // add associated layers
                layersKey[key].forEach(layer => map.addLayer(mapLayers[layer]))
            } else {
                console.log(`failed to fetch ${key} at url: ${value}`)
            }

        })
    }

    // getSrc(srcURLs.thumb).then(data => {
    //     if(data) {
    //         map.addSource('thumb', {
    //             'type': 'geojson',
    //             data: data
    //         })
    
    //         map.addLayer(mapLayers.thumb)
    //         map.addLayer(mapLayers.thumbPoints)
    //     } else {
    //         // @TODO: more graceful way to let users know data source failed to load
    //         alert('thumb Layer failed to load!')
    //     }
    // })

    // map events
    map.on('mouseenter', 'thumb', e => {
        map.getCanvas().style.cursor = 'pointer'
        const hoverDetails = hoverThumbLayer(e)
        makePopupContent(map, hoverDetails[0], hoverDetails[1], hoverPopup)
    })

    map.on('mouseenter', 'thumb-points', e => {
        map.getCanvas().style.cursor = 'pointer'
        const hoverDetails = hoverThumbLayer(e)
        makePopupContent(map, hoverDetails[0], hoverDetails[1], hoverPopup)
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

        fetchParkDetails(id).then(response => {
            // const popup = makeThumbPopup(data, gardenName)
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

        map.flyTo({
            center: lngLat,
            zoom: 16,
            speed: 0.5
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
