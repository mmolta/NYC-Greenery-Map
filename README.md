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
- [Tree Canopy Metrics](https://data.cityofnewyork.us/Environment/NYC-Urban-Tree-Canopy-Assessment-Metrics-2010/hnxz-kkn5)
- [Borough Boundaries](https://data.cityofnewyork.us/City-Government/Borough-Boundaries/tqmj-j8zm)
- [Trees Blockface Metrics](https://data.cityofnewyork.us/Environment/2015-Street-Tree-Census-Blockface-Data/2cd9-59fr)

## Other Resources
- [Million Trees NYC fact sheet](https://www.milliontreesnyc.org/html/urban_forest/urban_forest_facts.shtml)
- [OFFSET AND LIMIT OMG](https://support.socrata.com/hc/en-us/articles/202949268-How-to-query-more-than-1000-rows-of-a-dataset)
- [bbox finder](http://bboxfinder.com/#40.492909,-74.259338,40.652518,-74.049225)


## Getting Started
- `npm clean-install`
- `npm run start`


## Build
- `npm run build`


## @TODO
- GreenThumb clusters replace points
- Parks legend same semi-transparent + border as parks
- Feature state for hover effects
- Add header font "h1" "h2" "h3" etc.
- force green thumbs layer over parks layer