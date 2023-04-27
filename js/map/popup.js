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
    const span = document.createElement('span')
    const strong = document.createElement('strong')

    span.classList.add('popup-span')

    strong.textContent = props.gardenname

    span.appendChild(strong)

    return span
}

const makeParkPopup = () => {

}

export { makePopup, addPopup, makeThumbHoverPopup }