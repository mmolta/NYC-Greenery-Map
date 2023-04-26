// put the default layers here
const mapLayers = {
    dep: {
        id: 'dep',
        type: 'circle',
        source: 'dep'
    },
    thumb: {
        id: 'thumb',
        type: 'fill',
        source: 'thumb',
        paint: {
            'fill-color': '#F49D6E',
            'fill-outline-color': '#353535'
        }
    },
    thumbPoints: {
        id: 'thumbPoints',
        type: 'circle',
        source: 'thumb',
        paint: {
            'circle-radius': ['interpolate',
                ['linear'], ['zoom'],
                10, 4.5,
                11, 4,
                12, 3,
                13, 2,
                14, 0,
            ],
            'circle-color': '#F49D6E',
            'circle-stroke-color': '#FCFAF9',
            'circle-stroke-width': ['interpolate',
                ['linear'], ['zoom'],
                10, 1,
                13, 0
            ]
        }
    },
    parks: {
        id: 'parks',
        type: 'fill',
        source: 'parks',
        paint: {
            'fill-color': 'rgba(0,167,83,0.2)',
            'fill-outline-color': '#00a753'
        }
    },
    trails: {
        id: 'trails',
        type: 'line',
        source: 'trails',
        paint: {
            'line-color': '#6369D1',
            'line-width': ['interpolate',
                ['linear'],['zoom'],
                10, 2.5,
                11, 2,
                12, 1.5,
                13, 1,
            ]
        }
    }
}

const layersKey = {
    parks: ['parks'],
    thumb: ['thumb', 'thumbPoints'],
    trails: ['trails']
}

export { mapLayers, layersKey }