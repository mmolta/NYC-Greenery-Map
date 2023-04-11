const makePopup = () => new mapboxgl.Popup()

const makePopupContent = (map, lnglat, props, popup) => {
    const html = makePopupHTML(props)

    popup
    .setLngLat(lnglat)
    .setHTML(html)
    .addTo(map)
}

// @params props
    // {
    //  display: 'name to display',
    //  prop: 'value of property'
    // }
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