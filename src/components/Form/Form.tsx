import React, {FormEvent} from "react"

interface FormInterface extends HTMLFormElement {
  url: HTMLInputElement
}

interface FormProps {
  handleSubmit: (url: string) => void
}

function Form(props: FormProps): React.ReactElement {
  const ref = React.useRef<FormInterface>(null)

  async function _onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    if (ref.current !== null) {
      event.preventDefault()
      props.handleSubmit(ref.current.url.value)
      ref.current.reset()
    }
  }

  return (
    <form ref={ref} noValidate onSubmit={_onSubmit} className="mt-8">
      <input
        id="url"
        type="text"
        className="mx-auto block border-blue-400 border-2 rounded px-2 py-1"
      />
    </form>
  )
}

export default Form
