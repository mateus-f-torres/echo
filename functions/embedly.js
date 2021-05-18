const fetch = require("node-fetch")

const EMBEDLY_API_KEY = process.env.EMBEDLY_API_KEY
const EMBEDLY_API = "https://api.embedly.com/1/oembed?"

exports.handler = async (event, context) => {
  const url = JSON.parse(event.body).url
  let data

  try {
    console.log("[LOG]: requesting", url)
    const service = `${EMBEDLY_API}url=${url}&key=${EMBEDLY_API_KEY}&maxwidth=512`
    data = await request(service)
  } catch (error) {
    console.error("[ERROR]: something went wrong,", error)
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    }
  }

  // sign data for this demo
  data.api = "embedly"

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  }
}

async function request(url, options = {method: "GET"}) {
  const res = await fetch(url, options)
  if (!res.ok) {
    throw new Error("HTTP request error, ".concat(String(res.status)))
  } else if (res.status == 204) {
    return null
  } else {
    return await res.json()
  }
}
