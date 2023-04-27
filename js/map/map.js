import { positionMap } from './mapEvents.js'

mapboxgl.accessToken = 'pk.eyJ1IjoibW1vbHRhIiwiYSI6ImNqZDBkMDZhYjJ6YzczNHJ4cno5eTcydnMifQ.RJNJ7s7hBfrJITOBZBdcOA'

const initMap = () => {
    const position = positionMap()

    return new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v11',
        center: position.center,
        zoom: position.zoom
    })
}

const makeRegionalExtentEls = map => {
    const position = positionMap()

    const nycExtent = {
        center: position.center,
        zoom: position.zoom,
        pitch: 0,
        bearing: 0
    }

    // create custom button elements
    const button = document.createElement('button')
    const icon = document.createElement('img')

    icon.classList.add('extent-icon')

    button.type = 'button'
    button.title = 'Zoom to NYC extent'
    
    icon.id = 'regional-extent-img'
    icon.alt = 'NYC Alternative Logo'
    icon.src = '../../img/green-home-icon.png'

    button.classList.add('mapboxgl-ctrl-icon')
    button.classList.add('mapboxgl-ctrl-nyc')

    button.setAttribute('aria-label', 'Default NYC Extent')

    button.onclick = () => map.flyTo({center: nycExtent.center, zoom: nycExtent.zoom}) 

    button.appendChild(icon)

    return button
}

const makeControls = map => {
    const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        placeholder: 'Zoom to location',
        bbox: [-74.317017,40.489017,-73.708649,40.948830],
        marker: false
    })

    const navigationControl = new mapboxgl.NavigationControl();
    const extentControl = makeRegionalExtentEls(map)

    // plug into mapbox fncs
    map.addControl(geocoder, 'top-right')
    
    navigationControl._extent = extentControl
    navigationControl._container.appendChild(extentControl)

    return navigationControl
}

const makeMap = () => {
    const map = initMap()
    const control = makeControls(map)

    map.addControl(control);

    return map
}

export default makeMap