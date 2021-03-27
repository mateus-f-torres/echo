const chromium = require("chrome-aws-lambda")
const puppeteer = require("puppeteer-core")

const TITLE = "og:title"
const IMAGE = "og:image"
const DESCR = "og:description"
const PROPERTIES = [TITLE, DESCR, IMAGE]

exports.handler = async (event, context) => {
  let browser
  let data
  console.log(event)
  const url = event.url

  // make a initial skeleton of the main properties needed to generate a link preview
  const skeleton = Object.fromEntries(PROPERTIES.map((p) => [p, null]))

  console.log("[LOG]: setup chrome headless")
  try {
    const executablePath = await chromium.executablePath

    browser = await puppeteer.launch({
      defaultViewport: chromium.defaultViewport,
      executablePath: executablePath,
      headless: chromium.headless,
      args: chromium.args,
    })

    const page = await browser.newPage()
    await page.goto(url, {waitUntil: "networkidle0"})

    console.log("[LOG]: scraping", url)
    // 1st crawl, looking for Open Graph Protocol meta tags, prefixed with 'og:'
    const metatags = await page.$$('meta[property^="og:"]')
    const properties = await Promise.all(
      metatags.map(async (tag) => await page.evaluate(getMeta, tag))
    )
    const values = Object.fromEntries(properties)
    data = Object.assign({}, skeleton, values)

    // see if we need to crawl again
    if (hasMissingProperty(data)) {
      console.log("[WARN]: couldn't find all necessary meta tags in", url)
      console.log("[WARN]: searching for alternatives")
      // 2nd crawl, looking for alternatives in the HTML
      const alternatives = await page.evaluate(getMetaAlternatives)
      Object.assign(data, alternatives)
    }
  } catch (error) {
    console.error("[ERROR]: something went wrong during execution, ", error)
    return {
      statusCode: 500,
      body: JSON.stringify({error}),
    }
  } finally {
    console.log("[LOG]: teardown chrome headless")
    if (browser) await browser.close()
  }

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  }
}

function getMeta(el) {
  return [el.getAttribute("property"), el.getAttribute("content")]
}

function hasMissingProperty(obj) {
  return !Object.values(obj).every((value) => Boolean(value))
}

function getMetaAlternatives() {
  // alternative title text
  const titleName = document.head.querySelector("title").text

  // alternative image link
  const appleIcon = document.head.querySelector('link[rel="apple-touch-icon"]')
  const shortcutIcon = document.head.querySelector('link[rel="shortcut icon"]')
  const image = appleIcon
    ? appleIcon.getAttribute("href")
    : shortcutIcon.getAttribute("href")
  const imageLink = image.startsWith("/")
    ? document.location.origin.concat(image)
    : image

  // alternative description content
  const paragraphs = document.querySelectorAll("p").values()
  const firstParagraphWithText = Array.from(paragraphs).find((p) =>
    Boolean(p.innerText.trim())
  ).innerText
  return {
    ["alt:title"]: titleName,
    ["alt:image"]: imageLink,
    ["alt:description"]: firstParagraphWithText,
  }
}
