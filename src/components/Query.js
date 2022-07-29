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
      videoPreview {
        title
        fileName
        url
      }
      listenUrl
      sys {
        id
      }
    }
  }

}
`
export default query