import axios from "axios";

function numToLetters(e) {
    let t = "";
    for (const n of e.toString())
        t += String.fromCharCode(98 + parseInt(n, 10));
    return t
}

export function getOffset(id, timestamp) {
    return numToLetters(id + 99).toUpperCase() + "A" + numToLetters(timestamp - 1420070400).toUpperCase()
}

export function params(query) {
    const data = JSON.stringify({
        "query": query,
        "location": {
            "id": null,
            "name": "",
            "radius": 10
        },
        "filter": {
            "categoryId": null,
            "priceMin": null,
            "priceMax": null,
            "onlyWithPrice": false
        },
        "isUserSearch": true,
        "isFilterSearch": false
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

export async function searchMore(offset, query) {
    let data = JSON.stringify({
        "searchQuery": {
            "query": query,
            "location": {
                "id": null,
                "name": "",
                "radius": 10
            },
            "filter": {
                "categoryId": null,
                "priceMin": null,
                "priceMax": null,
                "onlyWithPrice": false
            },
            "isUserSearch": true,
            "isFilterSearch": false
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

