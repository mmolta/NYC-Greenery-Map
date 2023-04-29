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
    const textLookup = {
        "1": "M",
        "2": "X",
        "3": "B",
        "4": "Q",
        "5": "R"
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
            filters.thumb = ['==', 'borough', textLookup[boro]]
            filters.parks = ['==', 'borough', textLookup[boro]]
            filters.trees = ['', 'boro_code', boro]
    }

    return filters
}

const borobbox = {
    "0": [],
    "1": [[-74.049568,40.690326],[-73.867950,40.887515]],
    "2": [[-73.938332,40.783407],[-73.762207,40.915326]],
    "3": [[-74.044418,40.565199],[-73.831902,40.740225]],
    "4": [[-73.964767,40.539634],[-73.699036,40.802375]],
    "5": [[-74.259338,40.492909],[-74.049225,40.652518]]
}

export { positionMap, filterBoroughs, borobbox }