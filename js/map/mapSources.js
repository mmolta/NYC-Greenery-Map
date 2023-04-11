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
    
    // @NOTE: this is the current greenthumbs dataset but it DOESNT have geometry
        // common field is ParksID
        // join with ParksID
        // clicking an area creates a popup and FETCHES this endpoint with the parksID
            // creates a popup that has informaiton about the park
    // thumb: "https://data.cityofnewyork.us/resource/xqbk-beh5.jsonjson"
}

export { getSrc, srcURLs }