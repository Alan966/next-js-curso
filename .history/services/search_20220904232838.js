const algoliasearch = require('algoliasearch');

const APP_ID = 'HYOR88HI7T'
const APP_KEY = '49e720cfc6e3a4ccee958b87086328a3'

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