import React from 'react'

const TestCard = ({ title, className, fileName, dateTime }) => {
  return (
    <article className="flex flex-col justify-center px-11 py-4 w-full rounded-3xl bg-slate-50 max-md:px-5 max-md:max-w-full">
      <div className="w-full rounded-3xl max-w-[712px] max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <div className="flex flex-col w-[59%] max-md:ml-0 max-md:w-full">
            <div className="flex gap-px mt-1 w-full font-medium max-md:mt-10">
              <div className="flex flex-col items-start text-2xl text-sky-950">
                <h2 className="self-stretch">{title}</h2>
                <h3 className="mt-4">{className}</h3>
                <button className="gap-2 self-stretch px-4 py-1 mt-5 text-xl text-white bg-blue-500 rounded-3xl">
                  Send Test
                </button>
              </div>
              <button className="gap-2 self-end px-4 py-1 mt-24 text-xl text-white bg-blue-500 rounded-3xl max-md:mt-10">
                Edit Test
              </button>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[41%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col w-full text-base font-medium text-sky-950 max-md:mt-10">
              <div className="gap-2 self-stretch px-6 py-2 bg-blue-100 rounded-3xl max-md:px-5">
                {fileName}
              </div>
              <time className="self-end mt-3.5 max-md:mr-2">{dateTime}</time>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default TestCard
