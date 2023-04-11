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

const srcURLs = {
    dep: "https://data.cityofnewyork.us/resource/uyfj-5xid.geojson",
    thumb: "https://data.cityofnewyork.us/resource/p78i-pat6.geojson"
    // @NOTE: this is the 2022 ARCHIVED dataset. Using it because it has geometry
        // @NOTE: the geometry is part of properties. Worst case, can create a geoJSON that pulls it out of properties and into geom...
    // thumb: 'https://data.cityofnewyork.us/resource/ajxm-kzmj.geojson',
    
    // @NOTE: this is the current greenthumbs dataset but it DOESNT have geometry
    // thumb: "https://data.cityofnewyork.us/resource/xqbk-beh5.geojson"
}

export { getSrc, srcURLs }