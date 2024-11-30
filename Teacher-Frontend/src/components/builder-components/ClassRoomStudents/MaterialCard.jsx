import * as React from 'react'

export const MaterialCard = ({ fileName, description, onCreateTest }) => {
  return (
    <article className="flex overflow-hidden flex-col px-6 py-7 mx-auto w-full rounded-3xl bg-slate-50 shadow-[-4px_4px_30px_rgba(0,0,0,0.25)] max-md:px-5 max-md:mt-8">
      <div className="flex gap-5 justify-between text-2xl whitespace-nowrap text-sky-950">
        <h3>{fileName}</h3>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/eb62179562f944abbe4ced56301db351/85d269fa9d07b9d8e45d5d152e1816c94ce3e6151c85daa236c4d94ff32a8a32?apiKey=eb62179562f944abbe4ced56301db351&"
          alt=""
          className="object-contain shrink-0 my-auto aspect-square w-[25px]"
        />
      </div>
      <p className="self-start mt-3 text-base text-stone-500">{description}</p>
      <div className="flex gap-5 justify-between mt-11 w-full max-md:mt-10 max-md:mr-2.5">
        <div className="flex gap-10 items-center">
          <div className="flex items-center self-stretch px-7 py-0.5 my-auto bg-blue-100 rounded-3xl w-[84px] max-md:px-5">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/eb62179562f944abbe4ced56301db351/e093fe21197d3e62cdf603888a519e05a095cf3a57dac2f3cb13fbb22fc06c80?apiKey=eb62179562f944abbe4ced56301db351&"
              alt=""
              className="object-contain self-stretch my-auto w-8 aspect-square"
            />
          </div>
        </div>
        <button
          onClick={onCreateTest}
          className="gap-2 self-stretch px-4 py-1.5 my-auto text-base text-white bg-blue-500 rounded-3xl"
        >
          Create Test
        </button>
      </div>
    </article>
  )
}
