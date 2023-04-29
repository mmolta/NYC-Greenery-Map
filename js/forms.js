const handleFormInputs = (inputs, map) => {
    let active = []

    inputs.forEach(input => {
        const layer = input.value
        const checked = input.checked
        const visibility = checked ? 'visible' : 'none'

        if(checked) active.push(layer)

        if(map.getLayer(layer)) {
            map.setLayoutProperty(layer, 'visibility', visibility)
        }
        else {
            // add layer on first pass
            if(checked) {
                const mapLayer = secondaryMapLayers[layer]
                map.addLayer(mapLayer, 'road-label')
            }
        }
    })

    return active
}

// handles: select
const handleBoroughsForm = select => select.options[select.selectedIndex].value

export { handleBoroughsForm }