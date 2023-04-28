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
    // @TODO: replace thumbPoints with a symbol layer at the centroid of thumb
    // OR a thumb heatmap at a certain zoom level? and then hide it and show gardens
    // when zoomed in
    // OR use clusters at an upper zoom level
        // https://docs.mapbox.com/mapbox-gl-js/example/cluster-html/
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
        'source-layer': 'tree-lines-ddzcz1',
        paint: {
            'line-color': ['case',
                ['<', ['get', 'trees'], '1'], 'rgba(0,0,0,0)',
                ['all', ['>=', ['get', 'trees'], '1'], ['<', ['get', 'trees'], '3']], '#f7fcb9',
                ['all', ['>=', ['get', 'trees'], '3'], ['<', ['get', 'trees'], '9']], '#addd8e',
                '#31a354'
            ],
            'line-width': ['interpolate',
                ['linear'],['zoom'],
                9.75, 0.5,
                20, 2.25
            ]
        }
    }
}

const layersKey = {
    thumb: ['thumb', 'thumbPoints'],
    parks: ['parks'],
    trees: ['trees']
}

export { mapLayers, layersKey }