const makePopup = () => new mapboxgl.Popup()

const makePopupContent = (map, lnglat, props, popup) => {
    const html = makePopupHTML(props)

    popup
    .setLngLat(lnglat)
    .setHTML(html)
    .addTo(map)
}

const makePopupHTML = props => {
    let html = ''

    props.forEach(prop => {
        html += `
            <span class="popup-span">
                ${prop.display}: <strong>${prop.prop}</strong> 
            </span>
        `
    })
    
    return html
}

const makeThumbPopup = (response, gardenName, lngLat, clickPopup) => {
    let props;

    // @TODO: mockup a designed popup
    if(response.length) {
        const data = response[0]

    } else {

    }
}

export { makePopup, makePopupContent }