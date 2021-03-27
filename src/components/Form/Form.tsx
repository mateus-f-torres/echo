import React, {FormEvent} from "react"
import request from "../../utils/request"
import * as APIs from "../../utils/urls"

interface FormInterface extends HTMLFormElement {
  url: HTMLInputElement
}

function Form(): React.ReactElement {
  const ref = React.useRef<FormInterface>(null)

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    if (ref.current === null) return
    event.preventDefault()

    const url = ref.current.url.value

    try {
      request(APIs.PUPPETEER, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({url}),
      }).then(console.log, console.error)
    } catch (e) {
      console.error(e)
    }

    ref.current.reset()
  }

  return (
    <form ref={ref} noValidate onSubmit={handleSubmit} className="mt-8">
      <label htmlFor="url">Speak an URL</label>
      <input
        id="url"
        type="text"
        placeholder="https://github.com/mateus-f-torres/echo"
      />
    </form>
  )
}

export default Form
