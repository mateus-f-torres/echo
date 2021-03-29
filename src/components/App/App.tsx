import React from "react"

import Form from "../Form/Form"
import Cards from "../Cards/Cards"

import * as APIs from "../../utils/urls"
import request from "../../utils/request"

function App(): React.ReactElement {
  const [data, setData] = React.useState([])

  async function requestUrlScrape(url: string): Promise<void> {
    try {
      const newData = await Promise.all(
        Object.values(APIs).map(
          async (api) =>
            await request(api, {
              method: "POST",
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify({url}),
            })
        )
      )
      // @ts-expect-error
      setData([...data, ...newData])
    } catch (e) {
      console.error(e)
    }
  }

  console.log(data)

  return (
    <div className="max-w-lg mx-auto mt-24">
      <h1 className="font-body text-4xl font-bold text-regal-blue text-center">
        ECHO
      </h1>
      <Form handleSubmit={requestUrlScrape} />
      <Cards data={data} />
    </div>
  )
}

export default App
