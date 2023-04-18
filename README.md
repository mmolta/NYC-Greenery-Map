# NYC Greenery Map
Visualizing NYC Open Data's greenery datasets. Includes GreenThumb community gardens, parks properties, street tree coverage, forestry tree points (TBD), parks trails, and tree canopy metrics (TBD?). Final project for INFO 658, Information Visualization.

## Datasets
- [GreenThumb Community Gardens](https://data.cityofnewyork.us/dataset/GreenThumb-Garden-Info/p78i-pat6)
- [GreenThumb Site Visits](https://data.cityofnewyork.us/Environment/GreenThumb-Site-Visits/xqbk-beh5)
- [Street Trees](https://data.cityofnewyork.us/Environment/2015-Street-Tree-Census-Tree-Data/pi5s-9p35)
- [Parks Properties](https://data.cityofnewyork.us/Recreation/Parks-Properties/enfh-gkve)
- [Parks Trails](https://data.cityofnewyork.us/Environment/Parks-Trails/vjbm-hsyr)
- [Tree Canopy Metrics](https://data.cityofnewyork.us/Environment/NYC-Urban-Tree-Canopy-Assessment-Metrics-2010/hnxz-kkn5)
- [Forestry Tree Points](https://data.cityofnewyork.us/Environment/Forestry-Tree-Points/hn5i-inap)
    - this one may be skippable. Forest trees are presumably in parks and probably just add noise.

## Other Resources
- [Million Trees NYC fact sheet](https://www.milliontreesnyc.org/html/urban_forest/urban_forest_facts.shtml)

## @TODO
- Mockup designs for the popups
- Update API calls to only include relevant fields
- Fix build script to remove index.js from head
    - Temporary solution: copy index.html into index-prod.html, remove index.js and build from index-prod.html
    - Try a tweak of the [accepted solution here](https://stackoverflow.com/questions/50213866/how-to-delete-outputted-index-js-after-webpack-finishes) but instead of `rm dist/*.js` do `rm dist/index.js`