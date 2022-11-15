// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const handler = async (event) => {
  const SPACE_ID = process.env.SPACE_ID
  const CONTENT_DELIVERY = process.env.CONTENT_DELIVERY
  try {
    console.log(SPACE_ID);
    console.log(CONTENT_DELIVERY);
    return {
      // statusCode: 200,
      // body: JSON.stringify({ message: `Hello ${subject}` }),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (error) {
    const { status, statusText, headers, data } = error.response
    return {
      statusCode: status,
      body: JSON.stringify({ status, statusText, headers, data })
    }
  }
}

module.exports = { handler }
