// put functions for map events - hover, click, popups, etc in here
// import into index.js and add to map within map.on('load')
const positionMap = () => {
    if(window.innerWidth <= 420) {
        return {
            zoom: 7.3,
            center: [-75.25, 40.331]
        }
    } else {
        return {
            zoom: 8.25,
            center: [-75.2273, 40.071]
        }
    }
}

export { positionMap }