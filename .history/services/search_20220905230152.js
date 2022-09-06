const algoliasearch = require('algoliasearch');

const APP_ID = process.env.APP_ID
const APP_KEY = process.env.APP_KEY

const client = algoliasearch( APP_ID, APP_KEY );
const index = client.initIndex('replica-midudev');
const CACHE = {}

export const search = async ({ query }) => {
    if(CACHE[query]) return { results: CACHE[query]}

    const { hits } = await index.search(query, {
        attributesToRetrieve : ['id', 'title', 'img', 'alt'],
        hitsPerPage: 10
    })
    CACHE[query] = hits

    return { results: hits}
}