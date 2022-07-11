const query = `
{
  podcastCollection {
    items {
      slug
      podcastTitle
      description {
        json
      }
      hostNames
      coverArt {
        title
        fileName
        contentType
        url
        width
        height
      }
      youTubeId
      listenUrl
      sys {
        id
      }
    }
  }

}
`
export default query