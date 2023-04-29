// put functions for map events - hover, click, popups, etc in here
// import into index.js and add to map within map.on('load')
const positionMap = () => {
    if(window.innerWidth <= 420) {
        return {
            zoom: 8.3,
            center: [-73.951, 40.783]
        }
    } else {
        return {
            zoom: 9.75,
            center: [-73.911, 40.720]
        }
    }
}

const filterBoroughs = boro => {
    // @TODO: convert between numeric identifier and other boro identifiers
    const lookup = {
        "1": "A",
        "2": "B",
        "3": ""
    }
    
    const filters = {
        boro: null,
        thumb: null,
        parks: null,
        trees: null
    }

    switch(boro) {
        case "0":
            return filters
        default:
            filters.boro = ['==', 'boro_code', boro]
    }

    return filters
}

export { positionMap, filterBoroughs }