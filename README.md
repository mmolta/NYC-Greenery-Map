# NYC-DEP-Green-Infra-Map
Visualizing NYC Open Data's DEP Green Infrastructure 

## @TODO
- fix build script to remove index.js from head
    - create and build from index-deploy.html instead of index.html
        - need to maintain index-deploy so it's not a good solution
- mockup designs for the popups


## Datasets
@NOTE: for all, try to pre-select fields from the API call to reduce the bandwidth and speed up filters
- Street Trees: https://data.cityofnewyork.us/Environment/2015-Street-Tree-Census-Tree-Data/pi5s-9p35
    - @NOTE: status field contains "dead" so set a filter on the map for != 'dead' to reduce noise
- Parks Properties: https://data.cityofnewyork.us/Recreation/Parks-Properties/enfh-gkve
- Parks Trails: https://data.cityofnewyork.us/Environment/Parks-Trails/vjbm-hsyr
- Forestry Tree Points: https://data.cityofnewyork.us/Environment/Forestry-Tree-Points/hn5i-inap
    - this one may be skippable. Forest trees are presumably in parks and probably just add noise.
- Tree Canopy Metrics: https://data.cityofnewyork.us/Environment/NYC-Urban-Tree-Canopy-Assessment-Metrics-2010/hnxz-kkn5
    - @NOTE: no preview, just a JSON, unclear how usable this is in a mapping context
        - The Data Dictionary for this repo says TC_ID is the field that can join this to geographic data layers
    - This does have really useful metrics like canopy cover, % of land viable or unviable for greenery, shrub cover, etc
    - The challenge will be mapping this in a useful way but it could provide the underlying map-fill that I am looking for on this project
        - opacity 0.5 so that gardens and parks can be rendered on top. Trails as line segments. 
