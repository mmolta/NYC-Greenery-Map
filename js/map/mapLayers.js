// put the default layers here
const mapLayers = {
    thumb: {
        id: 'thumb',
        type: 'fill',
        source: 'thumb',
        paint: {
            'fill-color': '#522032',
            'fill-outline-color': '#E6E6FA'
        }
    },
    // @UPDATE: replace thumbPoints w/symbol at zoomed out level
    thumbIcon: {
        'id': 'thumb-icon',
        'source': 'thumb',
        'type': 'symbol',
        'layout': {
            // @TODO: add img src to map in index.js
            'icon-image': '',
            'icon-size': 0.3,
            'icon-allow-overlap': true
        },
        'maxzoom': 13
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
            'circle-color': '#522032',
            'circle-stroke-color': '#E6E6FA',
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
            'fill-color': 'rgba(31,103,53,0.3)',
            'fill-outline-color': '#522032'
        }
    },
    trees: {
        id: 'tree-lines',
        type: 'line',
        source: 'trees',
        'source-layer': 'tree-lines',
        paint: {
            'line-color': ['case',
                ['<', ['get', 'trees'], '1'], 'rgba(0,0,0,0)',
                ['all', ['>=', ['get', 'trees'], '1'], ['<', ['get', 'trees'], '5']], '#f7fcb9',
                ['all', ['>=', ['get', 'trees'], '5'], ['<', ['get', 'trees'], '9']], '#addd8e',
                '#31a354'
            ],
            'line-width': ['interpolate',
                ['linear'],['zoom'],
                9.75, 0.5,
                20, 2.25
            ]
        }
    },
    boroughs: {
        id: 'boroughs',
        type: 'line',
        source: 'boroughs',
        paint: {
            'line-color': '#353535',
            'line-width': ['interpolate',
                ['linear'],['zoom'],
                9.75, 0.5,
                20, 2.5
            ]
        }
    }
}

const layersKey = {
    thumb: ['thumb', 'thumbPoints'],
    parks: ['parks'],
    trees: ['trees'],
    boroughs: ['boroughs']
}

export { mapLayers, layersKey }