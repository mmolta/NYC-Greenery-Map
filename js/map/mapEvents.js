const borobbox = {
    "1": [[-74.049568,40.690326],[-73.867950,40.887515]],
    "2": [[-73.938332,40.783407],[-73.762207,40.915326]],
    "3": [[-74.044418,40.565199],[-73.831902,40.740225]],
    "4": [[-73.964767,40.539634],[-73.699036,40.802375]],
    "5": [[-74.259338,40.492909],[-74.049225,40.652518]]
}

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

const getRendered = features => {
    const treeData = {
        trees: {
            none: 0,
            low: 0,
            mid: 0,
            high: 0
        },
        totals: 0
    }

    const totalHigh = []

    features.forEach(feature => {
        const trees = parseInt(feature.properties.trees)

        if(trees === 0) treeData.trees.none += 1
        else if(trees < 5 && trees >= 1) treeData.trees.low += 1
        else if(trees >= 5 && trees < 9) treeData.trees.mid += 1
        else {
            treeData.trees.high += 1

            totalHigh.push({
                geom: feature.geometry,
                trees
            })
        }

        treeData.totals += trees
    })

    const sortedTops = totalHigh.sort((a, b) => b.trees - a.trees);
    treeData.tops = sortedTops.slice(0, 3);

    return treeData
}

export { positionMap, filterBoroughs, getRendered, borobbox }