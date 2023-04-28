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
            url: "https://data.cityofnewyork.us/resource/enfh-gkve.geojson?$select=multipolygon,BOROUGH,URL,TYPECATEGORY,NAME311,LOCATION,ACRES&TYPECATEGORY='Flagship Park' OR TYPECATEGORY='Nature Area' OR TYPECATEGORY='Community Park' OR TYPECATEGORY='Neighborhood Park' OR TYPECATEGORY='Triangle/Plaza' OR TYPECATEGORY='Historic House Park'"
        },
        thumb: {
            type: 'geojson',
            url:"https://data.cityofnewyork.us/resource/p78i-pat6.geojson?$select=multipolygon,gardenname,openhrsf,openhrsm,openhrssa,openhrssu,openhrsth,openhrstu,openhrsw,parksid,borough"
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