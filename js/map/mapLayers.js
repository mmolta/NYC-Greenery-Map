// put the default layers here
const mapLayers = {
    dep: {
        id: 'dep',
        type: 'circle',
        source: 'dep'
    },
    // thumb archive has SIZE fields
        // adjust circle radius based on the size of the garden
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
        id: 'thumb-points',
        type: 'circle',
        source: 'thumb',
        paint: {
            'circle-radius': ['interpolate',
                ['linear'], ['zoom'],
                10, 5,
                11, 4,
                12, 3,
                13, 2,
                14, 1,
                15, 0 
            ],
            'circle-color': ['match',
                ['get', 'status'],
                'Active', '#00a753',
                'Not GreenThumb', '#05adda',
                '#353535'
            ],
            'circle-stroke-color': '#FCFAF9'
        }
    }
}

export default mapLayers