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
- [Borough Boundaries](https://data.cityofnewyork.us/City-Government/Borough-Boundaries/tqmj-j8zm)

## Other Resources
- [Million Trees NYC fact sheet](https://www.milliontreesnyc.org/html/urban_forest/urban_forest_facts.shtml)


## Getting Started
- `npm clean-install`
- `npm run start`


## Build
- `npm run build`


## @TODO
- Mockup designs for the popups
- Filter Fetch
    - Parks:
        - see @NOTE
    - Street Trees
        - ignore status = "dead"
- Lookup what "openlawnorcommunalarea" means in greenthumb data dictionary
- Try adding GreenThumb markers on the fly rather than as points to have one per garden instead of a point on each vertex of any given garden
- Feature state for hover effects


## @NOTE
- classifying PARKS is hard
    - For the sake of this project, I only want to consider greenspaces. How can I filter that for example something like John Jay Park vs a playground in the LES.
    - Possible candidates according to TYPECATEGORY:
        - Community Park, Flagship Park, Historic House Park,  Nature Area, Neighbordhood Park, Playground, Triangle/Plaza
            - Mall, Strip, and Parkway can likely be accounted for with the street trees dataset...
    - Notable Exclusions:
        - Recreational Field/Courts (are tennis courts greenspaces? this would also include turf soccer fields so...), Cemetary? Playground?