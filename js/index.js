import makeMap from './map/map.js'
import { getSrc, srcURLs } from './map/mapSources.js'
import { mapLayers, layersKey } from './map/mapLayers.js'
import handleModal from './modal.js'
import handleForms from './forms.js'
import { makePopup, addPopup, makeThumbHoverPopup, makeThumbClickPopup } from './map/popup.js'
import { fetchParkDetails } from './map/mapFetch.js'


const modal = document.getElementById('modal')
const modalToggle = document.getElementById('modal-toggle')
const closeModal = document.getElementById('close-modal')
const toggleForm = document.querySelectorAll('.toggle-form')


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
        const logisticProps = e.features[0].properties
        const id = allProps.parksid
        let html;

        fetchParkDetails(id).then(response => {
            if(response.length) {
                html = makeThumbClickPopup(logisticProps, response[0])
            } else {
                html = makeThumbClickPopup(logisticProps, false)
            }

            addPopup(map, lngLat, html, hoverPopup)
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
                        display: 'Additional details for this park are unavailable',
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
