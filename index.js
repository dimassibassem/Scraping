import axios from "axios";


function getOffset(id, timestamp) {
    return numToLetters(id + 99).toUpperCase() + "A" + numToLetters(timestamp - 1420070400).toUpperCase()
}

function numToLetters(e) {
    let t = "";
    for (const n of e.toString())
        t += String.fromCharCode(98 + parseInt(n, 10));
    return t
}

const data = JSON.stringify({
    "query": "iphone 12",
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
const results = [];
const response = await axios(config);
response.data.ads.forEach(function (ad) {
    results.push(ad)
})
const hits = response.data.hits
let pages = 0;
if (hits % 20 === 0) {
    pages = Math.floor(hits / 20) - 1
} else {
    pages = Math.floor(hits / 20)
}

const searchMore = async (offset, query) => {
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

for (let i = 0; i < pages; i++) {
    console.log(`page: ${i}`)
    const lastItem = results[results.length - 1];

    const searchMoreData = await searchMore(getOffset(lastItem.id, lastItem.timestamp), "iphone 12")
    searchMoreData.forEach(item => {
        results.push(item)
    })
}

console.log(results)
console.log(results.length)

