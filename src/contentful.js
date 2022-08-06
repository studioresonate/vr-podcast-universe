const client = require('contentful').createClient({
  space: process.env.REACT_APP_SPACE_ID,
  accessToken: process.env.REACT_APP_CONTENT_DELIVERY
})

const getBlogPosts = () => client.getEntries().then(response => response.items)

const getSinglePost = slug =>
  client
    .getEntries({
      'fields.slug': slug,
      content_type: 'podcast'
    })
    .then(response => response.items)

export { getBlogPosts, getSinglePost }
