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
        thumb: {
            type: 'geojson',
            url:"https://data.cityofnewyork.us/resource/p78i-pat6.geojson?$select=multipolygon,gardenname,openhrsf,openhrsm,openhrssa,openhrssu,openhrsth,openhrstu,openhrsw,parksid,borough,status"
        },
        parks: {
            type: 'geojson',
            url: "https://data.cityofnewyork.us/resource/enfh-gkve.geojson?$select=multipolygon,borough,url,typecategory,name311,location,acres&typecategory='Flagship Park' OR typecategory='Nature Area' OR typecategory='Community Park' OR typecategory='Neighborhood Park' OR typecategory='Triangle/Plaza' OR typecategory='Historic House Park'"
        }
    },
    tiles: {
        trees: {
            type: 'vector',
            url: 'mapbox://mmolta.axm1ka2x'
        }
    }
}

export { getSrc, srcURLs }