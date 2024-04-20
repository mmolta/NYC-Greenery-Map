// put the default layers here
const mapLayers = {
    thumb: {
        id: 'thumb',
        type: 'fill',
        source: 'thumb',
        paint: {
            'fill-color': '#522032',
            // 'fill-outline-color': '#1f6735'
        }
    },
    thumbIcon: {
        id: 'thumbIcon',
        source: 'thumb',
        type: 'symbol',
        layout: {
            'icon-image': 'gthumbgarden',
            'icon-size': 0.32,
            'icon-size': ['interpolate',
                ['linear'], ['zoom'],
                9.75, 0.32,
                14, 0.56,
                18, 0.7,
            ],
            'icon-allow-overlap': true,
        },
        paint: {
            'icon-halo-color': '#522032'
        },
    },
    parks: {
        id: 'parks',
        type: 'fill',
        source: 'parks',
        paint: {
            'fill-color': 'rgba(31,103,53,0.5)',
            'fill-outline-color': '#1f6735'
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
    thumb: ['thumb', 'thumbIcon'],
    parks: ['parks'],
    trees: ['trees'],
    boroughs: ['boroughs']
}

export { mapLayers, layersKey }