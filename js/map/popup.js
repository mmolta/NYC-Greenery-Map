const makePopup = () => new mapboxgl.Popup()

const addPopup = (map, lnglat, html, popup) => {
    popup
    .setLngLat(lnglat)
    .setHTML(html)
    .addTo(map)
}

const makeThumbDetails = details => {
    return `
        <details open>
            <summary>Services</summary>
            <p class="details-content">
                This park offers a number of services including 
                ${details.onsiteservice ? 'a water source on site, ' : ''}
                ${details.rainharvesting ? `rain harvesting up to ${details.raingallons} gallons, `: ''}

            </p>
        </details>
        <details>
            <summary>Vegetation</summary>
        </details>
        <details>
            <summary>Wildlife</summary>
        </details>
        <details>
            <summary>Structures</summary>
        </details>
    `
}

const makeThumbLogistics = props => {
    return `
        <h2 class="popup-h2 thumb-popup-h2">${props.gardenname}</h2>
        <ul class="list-unstyled">
            <li>
                <strong>GreenThumb Status</strong>: ${props.status}
            </li>
            <li>
                <strong>Park Area:</strong> ${props.area} square feet
            </li>
        </ul>

        <h3 class="popup-h3 thumb-popup-h3">Hours</h2>
        <ul class="list-unstyled">
            <li>Monday: ${props.openhrsm === 'null' ? 'hours not posted' : props.openhrsm}</li>
            <li>Tuesday: ${props.openhrstu === 'null' ? 'hours not posted' : props.openhrstu}</li>
            <li>Wednesday: ${props.openhrsw === 'null' ? 'hours not posted' : props.openhrsw}</li>
            <li>Thursday: ${props.openhrsth === 'null' ? 'hours not posted' : props.openhrsth}</li>
            <li>Friday: ${props.openhrsf === 'null' ? 'hours not posted' : props.openhrsf}</li>
            <li>Saturday: ${props.openhrssa === 'null' ? 'hours not posted' : props.openhrssa}</li>
            <li>Sunday: ${props.openhrssu === 'null' ? 'hours not posted' : props.openhrssu}</li>
        </ul>
    `
}

const makeThumbClickPopup = (props, details) => {
    props.area = details ? details.totalsidewalkarea : 'undetermined'

    const thumbLogistics = makeThumbLogistics(props)
    const thumbDetails = details ? makeThumbDetails(details) : `<p>Additional details for this garden are unavailable.</p>`

    return `
        <div class="flex-row thumb-popup">
            <div class="thumb-popup-logistics">
                ${thumbLogistics}
            </div>

            <div class="thumb-popup-details">
                ${thumbDetails}
            </div>
        </div> 
    `
}

const makeThumbHoverPopup = props => {
    return `
        <span class="popup-span thumb-hover-popup">
            <strong>${props.gardenname}</strong>
        </span>
    `
}

const makeParkHoverPopup = props => {
    return `
        <span class="popup-span park-popup">
            <strong>${props.name311}</strong>
        </span>
    `
}

const makeParkClickPopup = props => {
    return `
        <span class="popup-span park-popup">
            <h2 class="popup-h2">${props.name311}</h2>
            
            <ul class="list-unstyled">
                <li>
                    <strong>Size</strong>: ${props.acres} acres
                </li>
                <li>
                    <strong>Type</strong>: ${props.typecategory}
                </li>
                <li>
                    ${props.url.length ? `<a href="${props.url}" target="_blank" rel="noopener noreferrer">park website</a>` : 'This park does not have an associated web page'}
                </li>
            </ul>
        </span>
    `
}

export { makePopup, addPopup, makeThumbHoverPopup, makeParkHoverPopup, makeThumbClickPopup, makeParkClickPopup }