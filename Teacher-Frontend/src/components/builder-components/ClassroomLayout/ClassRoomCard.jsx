// ClassroomCard.jsx
import * as React from 'react'

function ClassroomCard({ name, description, tests, activeTest, actions }) {
  return (
    <article className="flex overflow-hidden flex-col items-start px-6 py-6 w-full rounded-3xl bg-slate-50 shadow-[-4px_4px_30px_rgba(0,0,0,0.25)] max-md:px-5">
      <div className="flex gap-5 justify-between self-stretch text-2xl text-sky-950">
        <h2>{name}</h2>
        <button
          onClick={() => console.log('Options clicked')}
          aria-label="More options"
        >
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/eb62179562f944abbe4ced56301db351/85d269fa9d07b9d8e45d5d152e1816c94ce3e6151c85daa236c4d94ff32a8a32?apiKey=eb62179562f944abbe4ced56301db351&"
            alt=""
            className="object-contain shrink-0 my-auto aspect-square w-[25px]"
          />
        </button>
      </div>
      <p className="mt-1.5 text-base font-medium text-sky-950">{description}</p>
      <h3 className="mt-7 text-base font-medium text-sky-950">Recent Result</h3>
      <div className="flex gap-1.5 items-center mt-2.5 text-xs font-medium text-stone-500">
        {tests.map((test, index) => (
          <button
            key={index}
            className={`self-stretch px-3 py-1 my-auto ${
              index === activeTest
                ? 'bg-sky-200 text-sky-950'
                : 'border border-solid border-stone-500'
            } rounded-3xl`}
            onClick={() => console.log(`${test} clicked`)}
          >
            {test}
          </button>
        ))}
      </div>
      <div className="flex gap-10 items-center self-stretch mt-9 w-full">
        {actions.map((action, index) => (
          <button
            key={index}
            className="flex items-center self-stretch px-7 py-0.5 my-auto bg-blue-100 rounded-3xl w-[84px] max-md:px-5"
            onClick={() => console.log(`Action ${index + 1} clicked`)}
          >
            <img
              loading="lazy"
              src={`http://b.io/${action}`}
              alt=""
              className="object-contain self-stretch my-auto w-8 aspect-square"
            />
          </button>
        ))}
      </div>
    </article>
  )
}

export default ClassroomCard
