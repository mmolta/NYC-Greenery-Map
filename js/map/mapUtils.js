// put functions for map events - hover, click, popups, etc in here
// import into index.js and add to map within map.on('load')
const positionMap = () => {
    if(window.innerWidth <= 420) {
        return {
            zoom: 8.3,
            center: [-73.951, 40.783]
        }
    } else {
        return {
            zoom: 10.5,
            center: [-73.911, 40.763]
        }
    }
}

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

export { positionMap, fetchParkDetails }