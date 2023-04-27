const getSrc = async url => {
    const stream = await fetch(url, {
        method: 'GET',
        data: {
            'app_token': 'CFr3cIogbz6wjQIVlR6asLXkN'
        }
    })

    if(stream.ok) {
        const data = await stream.json()
        return data

    } else {
        console.log('faild to fetch data')
        return false
    }
}

const srcURLs = {
    parks: "https://data.cityofnewyork.us/resource/enfh-gkve.geojson?$select=BOROUGH,URL,TYPECATEGORY,NAME311,LOCATION,ACRES&TYPECATEGORY='Flagship Park' OR TYPECATEGORY='Nature Area' OR TYPECATEGORY='Community Park' OR TYPECATEGORY='Neighborhood Park' OR TYPECATEGORY='Triangle/Plaza' OR TYPECATEGORY='Historic House Park'",
    thumb: "https://data.cityofnewyork.us/resource/p78i-pat6.geojson?$select=gardenname,openhrsf,openhrsm,openhrssa,openhrssu,openhrsth,openhrstu,openhrsw,parksid,borough",
    trails: "https://data.cityofnewyork.us/resource/vjbm-hsyr.geojson?$select=Park_Name,Trail_Name,Class,Surface,Difficulty,Trail_Name,Width_ft",
    trees: "https://data.cityofnewyork.us/resource/5rq2-4hqu.geojson?$select=health,spc_common,spc_latin,borocode,tree_dbh&status=Alive"
}

export { getSrc, srcURLs }