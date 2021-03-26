import React, {FormEvent} from "react"

interface Form extends HTMLFormElement {
  url: HTMLInputElement
}

function App(): React.ReactElement {
  const formRef = React.useRef<Form>(null)

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    if (formRef.current === null) return
    event.preventDefault()

    const url = formRef.current.url.value
    alert(url)

    formRef.current.reset()
  }

  return (
    <div className="max-w-lg mx-auto mt-24">
      <h1 className="font-body text-4xl font-bold text-regal-blue text-center">
        ECHO
      </h1>
      <form ref={formRef} noValidate onSubmit={handleSubmit} className="mt-8">
        <label htmlFor="url">Give me a url!</label>
        <input
          id="url"
          type="text"
          placeholder="https://github.com/mateus-f-torres/echo"
        />
      </form>
    </div>
  )
}

export default App
