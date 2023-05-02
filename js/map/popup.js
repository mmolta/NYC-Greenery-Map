const makePopup = () => new mapboxgl.Popup()

const addPopup = (map, lnglat, html, popup) => {
    popup
    .setLngLat(lnglat)
    .setHTML(html)
    .addTo(map)
}

const makeThumbDetails = details => {
    // build composting phrase
    const composting = details.composting ? 'There is composting at this garden' : ''
    const composters = details.compostsystem ? ' including a compost system' : '.'
    const tumblers = details.composttumblers ? ' with on site compost tumblers.' : '.'
    const compostingLine = composting + composters + tumblers

    // build vegetation phrase
    let sadPark = false
    if(!details.food && !details.fruittrees && !details.treesingarden && !details.nonfoodplants) sadPark = true
    const hasTrees = details.treesingarden ? 'trees in the garden' : ''
    const andFood = hasTrees ? ' and ' : ''
    const nonFood = details.nonfoodplants ? 'non-food plants.' : ''
    const food = details.food ? 'This garden does grow food. ' : 'This garden does not grow food. '
    const hasFruitTrees = details.fruittrees ? 'There are even fruit trees in this garden!' : ''
    const regularPark = 'The kind of plant life you can find in this garden includes ' + hasTrees + andFood + nonFood + food + hasFruitTrees

    // build wildlife phrase
    let noWildlife = false
    if(!details.pond && !details.turtles &!details.aquaponics & !details.chicken) noWildlife = true
    const pond = details.pond ? 'There is a pond' : ''
    const aquaponics = details.aquaponics ? ' with an aquaponics system that uses natural waste to provide nutrients to hydroponic plants.' : ''
    const turtles = details.turtles ? ' and it has turtles in it!' : '.'
    const chickens = details.chickens ? 'There are chickens in this garden!' : ''
    const wildlife = pond + aquaponics + turtles + chickens

    // build structures phrase
    let noStructures = false
    if(!details.solarpanels && !details.greenhouse && !details.structureforseasonextension) noStructures = true
    const solar = details.solarpanels ? 'This garden is equipped with solar pannels for providing clean energy. ' : ''
    const greenhouse = details.greenhouse ? 'There is a greenhouse for controlled growing conditions. ' : ''
    const structureforseasonextension = details.structureforseasonextension ? 'There is even an all-weather structure that allows for year round growing at this garden.' : ''
    const structures = solar + greenhouse + structureforseasonextension

    return `
        <details open>
            <summary>Services</summary>
            <p class="details-content">
                This park offers a number of services.  
                ${composting ? compostingLine : ''}
                ${details.rainharvesting ? `There is rain harvesting up to ${details.raingallons} gallons. `: ''}
                ${details.csapickup ? 'There is a CSA pickup service at this park.' : ''}
                ${details.farmersmarket ? 'This park even has a farmers market!' : ''}
                ${details.onsiteservice ? 'There is a clean water drinking source on site. ' : ''}

            </p>
        </details>
        <details>
            <summary>Vegetation</summary>
            <p class="details-content">
                ${sadPark ? 'This garden has no listed plant life.' : regularPark}
            </p>
        </details>
        <details>
            <summary>Wildlife</summary>
            <p class="details-content">
                ${noWildlife ? 'There is no wildlife intentionally in the garden.' : wildlife}
            </p>
        </details>
        <details>
            <summary>Structures</summary>
            <p class="details-content">
                ${noStructures ? 'There are no structures inside this garden.' : structures}
            </p>
        </details>
    `
}

const makeThumbLogistics = props => {
    return `
        <h2 class="popup-h2 thumb-popup-h2">${props.gardenname}</h2>
        <ul class="list-unstyled">
            <li>
                GreenThumb Status: ${props.status}
            </li>
            <li>
                Park Area: ${props.area} square feet
            </li>
        </ul>

        <h3 class="popup-h3 thumb-popup-h3">Hours</h2>
        <ul class="list-unstyled hours-list">
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