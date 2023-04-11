// put functions for map events - hover, click, popups, etc in here
// import into index.js and add to map within map.on('load')
const positionMap = () => {
    if(window.innerWidth <= 420) {
        return {
            zoom: 8.3,
            center: [-73.971, 40.783]
        }
    } else {
        return {
            zoom: 10.5,
            center: [-73.971, 40.763]
        }
    }
}

export { positionMap }