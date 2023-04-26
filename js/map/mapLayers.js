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
            'fill-color': ['match',
                ['get', 'status'],
                'Active', '#00a753',
                'Not GreenThumb', '#05adda',
                '#353535'
            ],
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
                10, 5,
                11, 4,
                12, 3,
                13, 2,
                14, 0, 
            ],
            'circle-color': ['match',
                ['get', 'status'],
                'Active', '#00a753',
                'Not GreenThumb', '#05adda',
                '#353535'
            ],
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
        source: 'parks'
    },
    trails: {
        id: 'trails',
        type: 'line',
        source: 'trails'
    }
}

const layersKey = {
    thumb: ['thumb', 'thumbPoints'],
    parks: ['parks'],
    trails: ['trails']
}

export { mapLayers, layersKey }