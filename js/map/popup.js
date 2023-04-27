const makePopup = () => new mapboxgl.Popup()

const addPopup = (map, lnglat, html, popup) => {

    popup
    .setLngLat(lnglat)
    .setHTML(html)
    .addTo(map)
}

const makeThumbDetails = () => {

}

const makeThumbClickPopup = (logistics, details) => {
    const thumbDetails = makeThumbDetails()

    return `
        <div class="flex-row">
            <div class="thumb-popup-logistics">
                <h2 class="thump-popup-h2>${logistics.gardenName}</h2>
                
            </div>

            <div class="thumb-popup-details">
                ${thumbDetails}
            </div>
        </div> 
    `
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