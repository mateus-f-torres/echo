import React from "react"

// import Form from "../Form/Form"
// import Cards from "../Cards/Cards"

// import * as APIs from "../../utils/urls"
// import request from "../../utils/request"

function App(): React.ReactElement {
  // const [data, setData] = React.useState([])

  /* NOTE: disable while we experiment with Slack Bot Integration
  async function requestUrlScrape(url: string): Promise<void> {
    const newData = await Promise.allSettled(
      Object.values(APIs).map(
        async (api) =>
          await request(api, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({url}),
          })
      )
    ).then((promises) =>
      // @ts-expect-error
      promises.map((p) => (p.value !== undefined ? p.value : p.reason))
    )
    // @ts-expect-error
    setData([...data, ...newData])
  }
  */

  // console.log(data)

  return (
    <div className="max-w-lg mx-auto mt-24">
      <h1 className="font-body text-4xl font-bold text-regal-blue text-center">
        ECHO
      </h1>
      {/* <Form handleSubmit={requestUrlScrape} /> */}
      {/* <Cards data={data} /> */}
    </div>
  )
}

export default App
