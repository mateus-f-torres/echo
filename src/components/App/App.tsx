import React from "react"
import Form from "../Form/Form"

function App(): React.ReactElement {
  return (
    <div className="max-w-lg mx-auto mt-24">
      <h1 className="font-body text-4xl font-bold text-regal-blue text-center">
        ECHO
      </h1>
      <Form />
    </div>
  )
}

export default App
