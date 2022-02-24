import {getOffset, params, search, searchMore} from "./functions.js";

let query = "iphone 12"

const data = params(query).data
const config = params(query).config

const firstResult = await search(data, config)

const pages = firstResult.pages
const hits = firstResult.hits;
const results = firstResult.results;

console.log(hits);

for (let i = 0; i < pages; i++) {
    console.log(`page: ${i}`)
    const lastItem = results[results.length - 1];

    const searchMoreData = await searchMore(getOffset(lastItem.id, lastItem.timestamp), query)
    searchMoreData.forEach(item => {
        results.push(item)
    })
}


//console.log(results)
console.log(results.length)

