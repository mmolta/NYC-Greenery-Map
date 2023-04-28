# NYC Greenery Map
Visualizing NYC Open Data's greenery datasets. Includes GreenThumb community gardens, parks properties, street tree coverage, forestry tree points (TBD), parks trails, and tree canopy metrics (TBD?). Final project for INFO 658, Information Visualization.


## Datasets
- [GreenThumb Community Gardens](https://data.cityofnewyork.us/dataset/GreenThumb-Garden-Info/p78i-pat6)
    - [data dictionary](https://docs.google.com/spreadsheets/d/1ItvGzNG8O_Yj97Tf6am4T-QyhnxP-BeIRjm7ZaUeAxs/edit#gid=33327664)
- [GreenThumb Site Visits](https://data.cityofnewyork.us/Environment/GreenThumb-Site-Visits/xqbk-beh5)
    - [data dictionary](https://docs.google.com/spreadsheets/d/1ItvGzNG8O_Yj97Tf6am4T-QyhnxP-BeIRjm7ZaUeAxs/edit#gid=2090209353)
- [Street Trees](https://data.cityofnewyork.us/Environment/2015-Street-Tree-Census-Tree-Data/pi5s-9p35)
    - [data dictionary](https://data.cityofnewyork.us/api/views/pi5s-9p35/files/2e1e0292-20b4-4678-bea5-6936180074b3?download=true&filename=StreetTreeCensus2015TreesDataDictionary20161102.pdf)
    - ^ downloads as PDF
- [Parks Properties](https://data.cityofnewyork.us/Recreation/Parks-Properties/enfh-gkve)
    - [data dictionary](https://docs.google.com/document/d/1NExNJF5YKID04oOopi0fHainRuGG3Pz_jKSrMujPsPk/edit)
- [Parks Trails](https://data.cityofnewyork.us/Environment/Parks-Trails/vjbm-hsyr)
    - [data dictionary](https://data.cityofnewyork.us/api/views/vjbm-hsyr/files/0965afb6-2d20-40c5-8b9e-78a93c97d759?download=true&filename=ParksTrails_DataDictionary.xlsx)
    - ^ downlads as excel sheet
- [Tree Canopy Metrics](https://data.cityofnewyork.us/Environment/NYC-Urban-Tree-Canopy-Assessment-Metrics-2010/hnxz-kkn5)
- [Forestry Tree Points](https://data.cityofnewyork.us/Environment/Forestry-Tree-Points/hn5i-inap)
    - this one may be skippable. Forest trees are presumably in parks and probably just add noise.
- [Borough Boundaries](https://data.cityofnewyork.us/City-Government/Borough-Boundaries/tqmj-j8zm)
- [BLOCKFACE TREES](https://data.cityofnewyork.us/Environment/2015-Street-Tree-Census-Blockface-Data/2cd9-59fr)

## Other Resources
- [Million Trees NYC fact sheet](https://www.milliontreesnyc.org/html/urban_forest/urban_forest_facts.shtml)
- [OFFSET AND LIMIT OMG](https://support.socrata.com/hc/en-us/articles/202949268-How-to-query-more-than-1000-rows-of-a-dataset)


## Getting Started
- `npm clean-install`
- `npm run start`


## Build
- `npm run build`


## @TODO
- Mockup designs for the popups
- Try adding GreenThumb markers as symbols in the garden centroid instead of as points on each vertex
- Feature state for hover effects