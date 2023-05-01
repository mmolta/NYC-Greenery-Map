const positionMap = () => {
    if(window.innerWidth <= 420) {
        return {
            zoom: 8,
            center: [-73.951, 40.783]
        }
    } else {
        return {
            zoom: 10,
            center: [-73.911, 40.720]
        }
    }
}

const filterBoroughs = boro => {
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
            filters.trees = ['==', 'borocode', boro]
    }

    return filters
}

const borobbox = {
    "1": [[-74.049568,40.690326],[-73.867950,40.887515]],
    "2": [[-73.938332,40.783407],[-73.762207,40.915326]],
    "3": [[-74.044418,40.565199],[-73.831902,40.740225]],
    "4": [[-73.964767,40.539634],[-73.699036,40.802375]],
    "5": [[-74.259338,40.492909],[-74.049225,40.652518]]
}

// get data to update charts and totals and whatnot
const getRendered = features => {
    let totalTrees = 0

    const charts = {
        trees: {
            none: 0,
            low: 0,
            mid: 0,
            high: 0
        },
        parks: {
            "Community Park": 0,
            "Flagship Park": 0,
            "Historic House Park": 0,
            "Nature Area": 0,
            "Neighborhood Park": 0,
            "Triangle/Plaza": 0
        },
        thumb: {
            "Active": 0,
            "Active (Unlicensed)": 0,
            "Closed (Construction)": 0,
            "Closed (Other)": 0,
            "Inactive (Group Forming)": 0,
            "Inactive (No Group)": 0,
            "Not GreenThumb": 0
        }
    }

    features.forEach(feature => {
        const props = feature.properties

        switch(feature.source) {
            case 'parks':
                charts.parks[props.typecategory]++
                break
            case 'thumb':
                charts.thumb[props.status]++
                break 
            default:
                const trees = parseInt(props.trees)

                if(trees === 0) charts.trees.none += 1
                else if(trees < 3 && trees >= 1) charts.trees.low += 1
                else if(trees >= 3 && trees < 9) charts.trees.mid += 1
                else charts.trees.high += 1

                totalTrees += trees
        }
    })

    const totals = {
        trees: totalTrees,
        parks: Object.values(charts.parks).reduce((acc, val) => acc + val),
        thumb: Object.values(charts.thumb).reduce((acc, val) => acc + val)
    }

    return {
        charts,
        totals
    }
}

export { positionMap, filterBoroughs, getRendered, borobbox }