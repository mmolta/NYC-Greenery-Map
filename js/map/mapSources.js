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
        console.log('faild to fetch data')
        return false
    }
}

// @NOTE: ?$select=syntax,for,limiting,fields,while,fetching
const srcURLs = {
    // dep: "https://data.cityofnewyork.us/resource/uyfj-5xid.geojson",
    thumb: "https://data.cityofnewyork.us/resource/p78i-pat6.geojson",
    parks: "https://data.cityofnewyork.us/resource/enfh-gkve.geojson?$select=multipolygon,URL,TYPECATEGORY,SIGNNAME,MAPPED,LOCATION,ACRES",
    trails: "https://data.cityofnewyork.us/resource/vjbm-hsyr.geojson"
}

export { getSrc, srcURLs }