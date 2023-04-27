const makePopup = () => new mapboxgl.Popup()

const addPopup = (map, lnglat, html, popup) => {

    popup
    .setLngLat(lnglat)
    .setHTML(html)
    .addTo(map)
}

const makeThumbClickPopup = () => {

}

const makeThumbHoverPopup = (props) => {
    
}

const makeParkPopup = () {

}

export { makePopup, addPopup, makeThumbHoverPopup }