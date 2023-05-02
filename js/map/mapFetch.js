const fetchOpenData = async url => {
    try {
        const stream = await fetch(url, {
            method: 'GET',
            data: {
                'app_token': 'CFr3cIogbz6wjQIVlR6asLXkN'
            }
        })
    
        if(stream.ok) {
            return stream.json()
        } else {
            return false
        }
    } catch(error) {
        console.error(error)
    }
}

const textLookup = {
    "0": '',
    "1": "M",
    "2": "X",
    "3": "B",
    "4": "Q",
    "5": "R"
}

// make sure to only fetch ONCE
const beenFetched = {
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false
}

// @RETURN: totals and chart data
const fetchFeatures = async boro => {
    if(beenFetched[boro]) {
        console.log('been fetched!')
        return beenFetched[boro]
    }else {
        const gardenCode = textLookup[boro]
        let urls

        if(boro === 0) {
            urls = [
                `https://data.cityofnewyork.us/resource/p78i-pat6.json?$select=status`,
                `https://data.cityofnewyork.us/resource/enfh-gkve.json?$select=name311,acres&typecategory='Flagship Park' OR typecategory='Nature Area' OR typecategory='Community Park' OR typecategory='Neighborhood Park' OR typecategory='Triangle/Plaza' OR typecategory='Historic House Park'`,
            ]
        }else {
            urls = [
                `https://data.cityofnewyork.us/resource/p78i-pat6.json?$select=status&borough=${gardenCode}`,
                `https://data.cityofnewyork.us/resource/enfh-gkve.json?$select=name311,acres&typecategory='Flagship Park' OR typecategory='Nature Area' OR typecategory='Community Park' OR typecategory='Neighborhood Park' OR typecategory='Triangle/Plaza' OR typecategory='Historic House Park'&borough=${boro}`,
            ]
        }

        const requests = urls.map(url => fetchOpenData(url))
        const responses = await Promise.all(requests)
        const errors = responses.filter((response) => !response);

        if (errors.length > 0) {
            throw errors.map((response) => Error(response.statusText));
        }

        console.log(responses)
        // beenFetched[boro].thumb = thumbData
        // beenFetched[boro].park = parkData

        // // update beenFetched
        // beenFetched[boro] = {
        //     trees: {
        //         totals: treeResponse.length,
        //         chart: treesChart
        //     },
        //     parks: {
        //         totals: parkResponse.length
        //     },
        //     thumb: {
        //         totals: thumbResponse.length
        //     }
        // }

        // // return updated beenFetched
        // return beenFetched[boro]
    }
}

export { fetchOpenData, fetchFeatures }