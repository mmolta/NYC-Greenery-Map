const getSrc = async url => {
    const stream = await fetch(url, {
        method: 'GET',
        data: {
            'app_token': 'CFr3cIogbz6wjQIVlR6asLXkN'
        }
    })

    if(stream.ok) {
        const data = await stream.json()
        return data

    } else {
        return false
    }
}

const srcURLs = {
    openData: {
        parks: {
            type: 'geojson',
            url: encodeURI("https://data.cityofnewyork.us/resource/enfh-gkve.geojson?$select=multipolygon,borough,typecategory,name311,location,acres&typecategory='Flagship Park' OR typecategory='Nature Area' OR typecategory='Community Park' OR typecategory='Cemetery' OR typecategory='Neighborhood Park' OR typecategory='Triangle/Plaza' OR typecategory='Historic House Park'")
        },
        thumb: {
            type: 'geojson',
            url:"https://data.cityofnewyork.us/resource/p78i-pat6.geojson?$select=multipolygon,gardenname,openhrsf,openhrsm,openhrssa,openhrssu,openhrsth,openhrstu,openhrsw,parksid,borough,status"
        },
        boroughs: {
            type: 'geojson',
            url: "https://data.cityofnewyork.us/resource/7t3b-ywvw.geojson?$select=the_geom,boro_code"
        }
    },
    tiles: {
        trees: {
            type: 'vector',
            url: 'mapbox://mmmolta.tree-lines-b7air0'
        }
    }
}

export { getSrc, srcURLs }
