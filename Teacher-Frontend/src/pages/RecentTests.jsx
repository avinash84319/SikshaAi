import * as React from 'react'
import axios from 'axios'
import TestCard from './TestCard'

function RecentTests() {
  const [tests, setTests] = React.useState([])

  React.useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axios.get('/api/tests')
        setTests(response.data)
      } catch (error) {
        console.error('Failed to fetch tests:', error)
      }
    }
    fetchTests()
  }, [])

  return (
    <main className="flex overflow-hidden flex-col items-center pb-10 bg-white">
      <header className="flex flex-wrap gap-5 justify-between self-stretch px-16 py-5 w-full bg-slate-50 shadow-[0px_4px_20px_rgba(0,0,0,0.15)] max-md:px-5 max-md:max-w-full">
        <nav className="flex gap-9 items-end text-2xl font-medium text-stone-500 max-md:max-w-full">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/42e5619e6985a872cc0fd9bdbc49bf7fb63933932cd0bba2ca484bec765e0165?placeholderIfAbsent=true&apiKey=e40ab9010b324a23beb46e8f03978627"
            alt="Company Logo"
            className="object-contain self-stretch aspect-[3.6] w-[263px]"
          />
          <a href="/" className="mt-9">
            Home
          </a>
          <a href="/tests" className="mt-9 basis-auto text-sky-950">
            Recent Tests
          </a>
          <a href="/dashboard" className="mt-9 basis-auto">
            Dashboard
          </a>
        </nav>
        <div className="flex gap-10 self-start mt-1">
          <button
            className="flex gap-2 items-center px-6 py-2 my-auto text-xl font-medium bg-sky-200 rounded-3xl text-sky-950 max-md:px-5"
            onClick={() => (window.location.href = '/create-class')}
          >
            <span className="self-stretch my-auto">Create Class</span>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/89d7ca34115fe2cbf09b3cd8cdb651e5fbc563d1cc485f21c27c7bb8af9f2ac7?placeholderIfAbsent=true&apiKey=e40ab9010b324a23beb46e8f03978627"
              alt=""
              className="object-contain shrink-0 self-stretch my-auto aspect-square w-[30px]"
            />
          </button>
          <div className="flex items-center justify-center px-2.5 text-3xl font-bold text-white whitespace-nowrap bg-orange-700 rounded-full h-[65px] w-[65px]">
            DS
          </div>
        </div>
      </header>

      <section className="flex flex-col justify-center items-center px-16 py-8 mt-16 max-w-full rounded-3xl bg-slate-50 w-[834px] max-md:px-5 max-md:mt-10">
        <div className="flex flex-col w-full rounded-none max-w-[710px] max-md:max-w-full">
          <div className="flex flex-wrap gap-5 justify-between w-full max-md:max-w-full">
            <h1 className="my-auto text-2xl font-medium text-sky-950">
              Robert Bosch
            </h1>
            <button
              className="flex overflow-hidden gap-2.5 items-center px-3 py-2 bg-blue-100 rounded-[30px]"
              aria-label="More options"
            >
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/49f822d3611a61f39e67e9bc3b217e1fbc372b954dc43c4adb6bfbda2b9665ac?placeholderIfAbsent=true&apiKey=e40ab9010b324a23beb46e8f03978627"
                alt=""
                className="object-contain self-stretch my-auto aspect-[0.75] w-[15px]"
              />
            </button>
          </div>
          <div className="flex flex-wrap gap-8 items-center mt-8 max-w-full text-xl font-medium whitespace-nowrap text-sky-950 w-[613px]">
            <div className="flex gap-2 items-center self-stretch px-6 py-2 my-auto bg-blue-100 rounded-3xl max-md:px-5">
              <span className="self-stretch my-auto">Sections</span>
              <span className="self-stretch my-auto">1</span>
            </div>
            <div className="flex gap-2 items-center self-stretch px-6 py-2 my-auto bg-blue-100 rounded-3xl max-md:px-5">
              <span className="self-stretch my-auto">Easy</span>
              <span className="self-stretch my-auto">1</span>
            </div>
            <div className="flex gap-2 items-center self-stretch px-6 py-2 my-auto bg-blue-100 rounded-3xl max-md:px-5">
              <span className="self-stretch my-auto">Medium</span>
              <span className="self-stretch my-auto">0</span>
            </div>
            <div className="flex gap-2 items-center self-stretch px-6 py-2 my-auto bg-blue-100 rounded-3xl max-md:px-5">
              <span className="self-stretch my-auto">Hard</span>
              <span className="self-stretch my-auto">0</span>
            </div>
          </div>
        </div>
      </section>

      {tests.map((test, index) => (
        <TestCard
          key={index}
          title={test.title}
          sections={test.sections}
          easy={test.easy}
          medium={test.medium}
          hard={test.hard}
        />
      ))}
    </main>
  )
}

export default RecentTests
 
function TestCard({ title, sections, easy, medium, hard }) {
  return (
    <article className="flex flex-col justify-center items-center px-16 py-8 mt-8 max-w-full rounded-3xl bg-slate-50 w-[834px] max-md:px-5">
      <div className="flex flex-col w-full rounded-none max-w-[710px] max-md:max-w-full">
        <div className="flex flex-wrap gap-5 justify-between w-full max-md:max-w-full">
          <h2 className="my-auto text-2xl font-medium text-sky-950">{title}</h2>
          <button
            className="flex overflow-hidden gap-2.5 items-center px-3 py-2 bg-blue-100 rounded-[30px]"
            aria-label="More options"
            tabIndex={0}
          >
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/49f822d3611a61f39e67e9bc3b217e1fbc372b954dc43c4adb6bfbda2b9665ac?placeholderIfAbsent=true&apiKey=e40ab9010b324a23beb46e8f03978627"
              alt=""
              className="object-contain self-stretch my-auto aspect-[0.75] w-[15px]"
            />
          </button>
        </div>
        <div className="flex flex-wrap gap-8 items-center mt-8 max-w-full text-xl font-medium whitespace-nowrap text-sky-950 w-[613px]">
          <div className="flex gap-2 items-center self-stretch px-6 py-2 my-auto bg-blue-100 rounded-3xl max-md:px-5">
            <span className="self-stretch my-auto">Sections</span>
            <span className="self-stretch my-auto">{sections}</span>
          </div>
          <div className="flex gap-2 items-center self-stretch px-6 py-2 my-auto bg-blue-100 rounded-3xl max-md:px-5">
            <span className="self-stretch my-auto">Easy</span>
            <span className="self-stretch my-auto">{easy}</span>
          </div>
          <div className="flex gap-2 items-center self-stretch px-6 py-2 my-auto bg-blue-100 rounded-3xl max-md:px-5">
            <span className="self-stretch my-auto">Medium</span>
            <span className="self-stretch my-auto">{medium}</span>
          </div>
          <div className="flex gap-2 items-center self-stretch px-6 py-2 my-auto bg-blue-100 rounded-3xl max-md:px-5">
            <span className="self-stretch my-auto">Hard</span>
            <span className="self-stretch my-auto">{hard}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
 