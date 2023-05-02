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
    console.log(beenFetched)

    if(beenFetched[boro]) {
        return beenFetched[boro]
    }else {
        const boroCode = textLookup[boro]
        let urls

        if(boro == 0) {
            urls = [
                encodeURI(`https://data.cityofnewyork.us/resource/p78i-pat6.json?$select=status`),
                encodeURI(`https://data.cityofnewyork.us/resource/enfh-gkve.json?$select=typecategory,name311,location,acres&typecategory='Flagship Park' OR typecategory='Nature Area' OR typecategory='Community Park' OR typecategory='Neighborhood Park' OR typecategory='Triangle/Plaza' OR typecategory='Historic House Park'`),
            ]
        }else {
            urls = [
                encodeURI(`https://data.cityofnewyork.us/resource/p78i-pat6.json?$select=status&borough=${boroCode}`),
                encodeURI(`https://data.cityofnewyork.us/resource/enfh-gkve.json?$select=typecategory,name311,location,acres&borough=${boroCode}`),
            ]
        }

        const requests = urls.map(url => fetchOpenData(url))
        const responses = await Promise.all(requests)
        const errors = responses.filter((response) => !response);

        if (errors.length > 0) {
            throw errors.map((response) => Error(response.statusText));
        }
        
        // @TODO: build the top 3 largest in this loop
        const parksFiltered = responses[1].filter(response => {
            switch(response.typecategory) {
                case 'Flagship Park':
                    return true
                case 'Nature Area':
                    return true
                case 'Community Park':
                    return true
                case 'Neighborhood Park':
                    return true
                case 'Triangle/Plaza':
                    return true
                case 'Historic House Park':
                    return true
                default:
                    return false
            }
        })

        // // update beenFetched
        beenFetched[boro] = {
            thumb: {
                totals: responses[0].length
            },
            parks: {
                totals: parksFiltered.length
            }
        }

        // // return updated beenFetched
        return beenFetched[boro]
    }
}

export { fetchOpenData, fetchFeatures }