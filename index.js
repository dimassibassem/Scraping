import {getOffset, params, search, searchMore} from "./functions.js";
import {locations} from "./locations.js";

let query = "iphone 12"
let locationId = "1280" //null
let maxPrice = 2500 // null
let minPrice = 1500 // null


const dataConfig = params(query,locationId,locations,minPrice,maxPrice)
const firstResult = await search(dataConfig.data, dataConfig.config)

const pages = firstResult.pages
const hits = firstResult.hits;
const results = firstResult.results;

console.log("hits: " + hits);

for (let i = 0; i < pages; i++) {
    console.log(`page: ${i}`)
    const lastItem = results[results.length - 1];

    const searchMoreData = await searchMore(getOffset(lastItem.id, lastItem.timestamp), query,locationId,locations,minPrice,maxPrice)
    searchMoreData.forEach(item => {
        results.push(item)
    })
}


console.log(results)
console.log(results.length)

