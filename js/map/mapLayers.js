// put the default layers here
const mapLayers = {
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
                9.75, 4,
                10, 3.5,
                11, 3,
                12, 2.5,
                13, 0,
            ],
            'circle-color': '#F49D6E',
            'circle-stroke-color': '#FCFAF9',
            'circle-stroke-width': ['interpolate',
                ['linear'], ['zoom'],
                9.75, 1,
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
                9.75, 2,
                11, 2,
                12, 3
            ]
        }
    },
    trees: {
        id: 'trees',
        type: 'circle',
        source: 'trees',
        paint: {
            'circle-color': 'green',
            'circle-radius': ['interpolate',
                ['linear'],['zoom'],
                9.75, 2,
                11, 1.5,
                13, 1
            ],
            'circle-stroke-color': '#FCFAF9'
        }
    }
}

const layersKey = {
    thumb: ['thumb', 'thumbPoints'],
    trails: ['trails'],
    parks: ['parks'],
    trees: ['trees']
}

export { mapLayers, layersKey }