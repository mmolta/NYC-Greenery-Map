# NYC-DEP-Green-Infra-Map
Visualizing NYC Open Data's DEP Green Infrastructure 

## @TODO
- fix build script to remove index.js from head
    - create and build from index-deploy.html instead of index.html
        - need to maintain index-deploy so it's not a good solution
- mockup designs for the popups


## Datasets
- Street Trees: https://data.cityofnewyork.us/Environment/2015-Street-Tree-Census-Tree-Data/pi5s-9p35
    - @NOTE: status field contains "dead" so set a filter on the map for != 'dead' to reduce noise
- Parks Properties: https://data.cityofnewyork.us/Recreation/Parks-Properties/enfh-gkve
- Parks Trails: https://data.cityofnewyork.us/Environment/Parks-Trails/vjbm-hsyr
- Forestry Tree Points: https://data.cityofnewyork.us/Environment/Forestry-Tree-Points/hn5i-inap
    - this one may be skippable. Forest trees are presumably in parks and probably just add noise.