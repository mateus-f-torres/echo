const fetch = require("node-fetch")

const IFRAMELY_API = "http://iframe.ly/api/oembed?"

exports.handler = async (event, context) => {
  let data

  try {
    const url = "https://github.com/mateus-f-torres/echo"
    const service = `${IFRAMELY_API}url=${event.url || url}&api_key=${
      process.env.IFRAMELY_API_KEY
    }`

    console.log("[LOG]: requesting", service)
    data = await request(service)
  } catch (error) {
    console.error("[ERROR]: something went wrong,", error)
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    }
  }

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
