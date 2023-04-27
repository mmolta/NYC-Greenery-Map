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
    return `
        <span class="popup-span">
            <strong>${props.gardenName}</strong>
        </span>
    `
}

const makeParkPopup = () => {

}

export { makePopup, addPopup, makeThumbHoverPopup }