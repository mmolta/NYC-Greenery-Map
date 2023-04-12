const fetchParkDetails = async id => {
    const stream = await fetch(`https://data.cityofnewyork.us/resource/xqbk-beh5.json?parksid=${id}`, {
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

export { fetchParkDetails }