// StudentCard.jsx
import * as React from 'react'

const StudentCard = ({ studentName }) => {
  return (
    <div className="flex overflow-hidden flex-col px-6 py-7 mx-auto w-full rounded-3xl bg-slate-50 shadow-[-4px_4px_30px_rgba(0,0,0,0.25)] max-md:px-5 max-md:mt-8">
      <div className="flex gap-5 justify-between text-2xl text-sky-950 max-md:mr-0.5">
        <div>{studentName}</div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/eb62179562f944abbe4ced56301db351/85d269fa9d07b9d8e45d5d152e1816c94ce3e6151c85daa236c4d94ff32a8a32?apiKey=eb62179562f944abbe4ced56301db351&"
          alt="Student profile icon"
          className="object-contain shrink-0 my-auto aspect-square w-[25px]"
        />
      </div>
      <div className="self-start mt-6 text-base font-medium text-sky-950">
        Recent Result
      </div>
      <div className="flex gap-1.5 items-center self-start mt-2.5 text-xs font-medium text-stone-500">
        <div className="self-stretch px-3 py-1 my-auto bg-sky-200 rounded-3xl text-sky-950">
          Test 1
        </div>
        <div className="self-stretch px-3 py-1 my-auto rounded-3xl border border-solid border-stone-500">
          Test 2
        </div>
        <div className="self-stretch px-3 py-1 my-auto rounded-3xl border border-solid border-stone-500">
          Test 3
        </div>
        <div className="self-stretch px-3 py-1 my-auto rounded-3xl border border-solid border-stone-500">
          Test 4
        </div>
      </div>
      <div className="flex gap-10 items-center mt-9 w-full">
        <div className="flex items-center self-stretch px-7 py-0.5 my-auto bg-blue-100 rounded-3xl w-[84px] max-md:px-5">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/eb62179562f944abbe4ced56301db351/a010e9c5bb73f2c2c7cd386c850e4e5c3823cca80c75bce40c4440482b716f69?apiKey=eb62179562f944abbe4ced56301db351&"
            alt="Action icon 1"
            className="object-contain self-stretch my-auto w-8 aspect-square"
          />
        </div>
        <div className="flex items-center self-stretch px-7 py-0.5 my-auto bg-blue-100 rounded-3xl w-[84px] max-md:px-5">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/eb62179562f944abbe4ced56301db351/c5e9fb5a90ea6d4c4ebef30beab5eda51fb7dde894bc06fc119e471d0febd2fc?apiKey=eb62179562f944abbe4ced56301db351&"
            alt="Action icon 2"
            className="object-contain self-stretch my-auto w-8 aspect-square"
          />
        </div>
        <div className="flex items-center self-stretch px-7 py-0.5 my-auto bg-blue-100 rounded-3xl w-[84px] max-md:px-5">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/eb62179562f944abbe4ced56301db351/77901f3f344e1a46b6ff65a3c28103fdc4ce77b7b846eb3ae178da6aae06f569?apiKey=eb62179562f944abbe4ced56301db351&"
            alt="Action icon 3"
            className="object-contain self-stretch my-auto w-8 aspect-square"
          />
        </div>
      </div>
    </div>
  )
}

export default StudentCard
