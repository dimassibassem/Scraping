import {decode, getData, getImages, getOffset, params, search, searchMore} from "./functions.js";
import {locations} from "./locations.js";

let query = "iphone 12"
let locationId = "1280" //null
let maxPrice = 2500 // null
let minPrice = 1500 // null

try {
    const dataConfig = params(query, locationId, locations, minPrice, maxPrice)
    const firstResult = await search(dataConfig.data, dataConfig.config)

    const pages = firstResult.pages
    const hits = firstResult.hits;
    const results = firstResult.results;


    const appData = await getData()
// console.log("appData: ", appData)
    const decodedAppData = decode(appData, 4)

    console.log("Source: ", decode(decodedAppData.src, 1))
    console.log("categoryDisplayNames: ", decode(decodedAppData.cat, 2))
    const crawlerAdUrls = decode(decodedAppData.cau, 3)
    console.log(crawlerAdUrls);

    console.log("hits: " + hits);

    for (let i = 0; i < pages; i++) {
        console.log(`page: ${i}`)
        const lastItem = results[results.length - 1];

        const searchMoreData = await searchMore(getOffset(lastItem.id, lastItem.timestamp), query, locationId, locations, minPrice, maxPrice)
        searchMoreData.forEach(async item => {
            item = {
                ...item,
                sourceUrl: crawlerAdUrls[item.crawlerId].replace(/{id}/g, item.externalId),
                //images: await getImages(item.id)
            }
            results.push(item)
        })
    }


    console.log(results)
} catch (e) {
    console.log(err);
}


