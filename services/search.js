const algoliasearch = require('algoliasearch');


const client = algoliasearch('HYOR88HI7T', '49e720cfc6e3a4ccee958b87086328a3');
const index = client.initIndex('replica-midudev');

export const search = async ({ query }) => {
    const { hits } = await index.search(query, {
        attributesToRetrieve : ['id', 'title', 'img', 'alt'],
        hitsPerPage: 10
    })

    return { results: hits}
}