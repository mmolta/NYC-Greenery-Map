const makePopup = () => new mapboxgl.Popup()

const makePopupContent = (map, lnglat, props, popup) => {
    const html = makePopupHTML(props)

    popup
    .setLngLat(lnglat)
    .setHTML(html)
    .addTo(map)
}


// @TODO: generic popups don't make sense - create custom fnc per interaction
    // mouseover: just garden name
    // click: conditional sentences with bolded response data
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

export { makePopup, makePopupContent }