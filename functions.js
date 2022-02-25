import axios from "axios";
import {locations} from "./locations.js";

const locationIndex = (locationId)=>{
    return locations.findIndex(element => {
        if (element.id === locationId) {
            return true;
        }
    });

}

function numToLetters(e) {
    let t = "";
    for (const n of e.toString())
        t += String.fromCharCode(98 + parseInt(n, 10));
    return t
}

export function getOffset(id, timestamp) {
    return numToLetters(id + 99).toUpperCase() + "A" + numToLetters(timestamp - 1420070400).toUpperCase()
}
export async function search(data, config) {
    const results = [];
    const response = await axios(config);
    response.data.ads.forEach(function (ad) {
        results.push(ad)
    })


    const hits = response.data.hits
    let pages;
    if (hits % 20 === 0) {
        pages = Math.floor(hits / 20) - 1
    } else {
        pages = Math.floor(hits / 20)
    }

    return {
        hits: hits,
        pages: pages,
        results: results,
    }
}


export function params(query,locationId,locations,minPrice,maxPrice) {
    const data = JSON.stringify({
        "query": query,
        "location": {
            "id": (locationId === null) ? null : locationId,
            "name": (locationId === null) ? "" : locations[locationIndex(locationId)].name,
            "radius": 10
        },
        "filter": {
            "categoryId": null,
            "priceMin": (minPrice === null)?null:minPrice,
            "priceMax": (maxPrice === null)?null:maxPrice,
            "onlyWithPrice": false
        },
        "isUserSearch": true,
        "isFilterSearch": (locationId !== null) || (minPrice !== null) || (maxPrice !== null)
    });


    const config = {
        method: 'post',
        url: 'https://api.9annas.tn/search',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };
    return {
        data: data,
        config: config,
    }
}


export async function searchMore(offset, query,locationId,locations,minPrice,maxPrice) {

    const data = JSON.stringify({
            "searchQuery": {
                "query": query,
                "location": {
                    "id": (locationId === null) ? null:locationId,
                    "name": (locationId === null )?"":locations[locationIndex(locationId)].name ,
                    "radius": 10
                },
                "filter": {
                    "categoryId": null,
                    "priceMin": (minPrice === null)?null:minPrice,
                    "priceMax": (maxPrice === null)?null:maxPrice,
                    "onlyWithPrice": false
                },
                "isUserSearch": true,
                "isFilterSearch":(locationId !== null) || (minPrice !== null) || (maxPrice !== null)
            },
            "offset": offset
        });


    let config = {
        method: 'post',
        url: 'https://api.9annas.tn/searchmore',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    const response = await axios(config)

    return response.data

}

