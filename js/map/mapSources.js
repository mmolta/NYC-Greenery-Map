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
}

export { getSrc, srcURLs }