import React from "react"

function Cards(props: any): React.ReactElement {
  return (
    <ul className="mt-8">
      {
        // @ts-expect-error
        props.data.map((d, i) => {
          const key = d.api.concat(i)
          return (
            <li key={key} className="mb-8">
              <h2 className="mb-2 font-body text-2xl font-bold text-regal-blue capitalize">
                {d.api}
              </h2>
              {typeof d.html === "string" ? (
                <div dangerouslySetInnerHTML={{__html: d.html}} />
              ) : d.api === "embedly" ? (
                <div>
                  <a href={d.url} className="embedly-card">
                    {d.title}
                  </a>
                </div>
              ) : (
                <figure className="flex border-dialog-green border-2 rounded">
                  <img src={d.image} alt={d.title} className="w-40 mr-2" />
                  <figcaption className="p-2 flex flex-col justify-center">
                    <h3 className="font-bold mb-4">{d.title}</h3>
                    <p className="text-sm">{d.description}</p>
                  </figcaption>
                </figure>
              )}
            </li>
          )
        })
      }
    </ul>
  )
}

export default Cards
