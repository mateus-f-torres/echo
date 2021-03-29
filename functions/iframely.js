const fetch = require("node-fetch")

const IFRAMELY_API_KEY = process.env.IFRAMELY_API_KEY
const IFRAMELY_API = "http://iframe.ly/api/oembed?"

exports.handler = async (event, context) => {
  const url = JSON.parse(event.body).url
  let data

  try {
    console.log("[LOG]: requesting", url)
    const service = `${IFRAMELY_API}url=${url}&api_key=${IFRAMELY_API_KEY}&iframe=1&omit_script=1`
    data = await request(service)
  } catch (error) {
    console.error("[ERROR]: something went wrong,", error)
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    }
  }

  // sign data for this demo
  data.api = "iframely"

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
