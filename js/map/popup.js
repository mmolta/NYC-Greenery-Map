const makePopup = () => new mapboxgl.Popup()

const addPopup = (map, lnglat, html, popup) => {

    popup
    .setLngLat(lnglat)
    .setHTML(html)
    .addTo(map)
}

const makeThumbDetails = details => {
    return `
        <p>I'm a friggin garden</p>
    `
}

const makeThumbClickPopup = (logistics, details) => {
    const thumbDetails = makeThumbDetails(details)

    return `
        <div class="flex-row">
            <div class="thumb-popup-logistics">
                <h2 class="thump-popup-h2>${logistics.gardenname}</h2>
                
            </div>

            <div class="thumb-popup-details">
                ${thumbDetails}
            </div>
        </div> 
    `
}

const makeThumbHoverPopup = props => {
    return `
        <span class="popup-span">
            <strong>${props.gardenname}</strong>
        </span>
    `
}

const makeParkHoverPopup = props => {
    return `
        <span class="popup-span">
            <strong>${props.NAME311}
        </span>
    `
}

export { makePopup, addPopup, makeThumbHoverPopup, makeParkHoverPopup, makeThumbClickPopup }