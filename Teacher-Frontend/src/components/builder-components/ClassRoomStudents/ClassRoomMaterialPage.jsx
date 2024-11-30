import * as React from 'react'
import axios from 'axios'
import { ResourceCard } from './ResourceCard'

export default function ClassRoomMaterialPage() {
  const [resources, setResources] = React.useState([])

  React.useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get('/api/resources')
        setResources(response.data)
      } catch (error) {
        console.error('Error fetching resources:', error)
      }
    }
    fetchResources()
  }, [])

  const handleCreateTest = async (resourceId) => {
    try {
      await axios.post('/api/tests/create', { resourceId })
    } catch (error) {
      console.error('Error creating test:', error)
    }
  }

  const handleSendFiles = async () => {
    try {
      await axios.post('/api/resources/send')
    } catch (error) {
      console.error('Error sending files:', error)
    }
  }

  return (
    <div className="flex overflow-hidden flex-col bg-white">
      <header className="flex flex-wrap gap-5 justify-between px-16 py-5 w-full bg-slate-50 shadow-[0px_4px_20px_rgba(0,0,0,0.15)] max-md:px-5 max-md:max-w-full">
        <nav className="flex gap-9 items-end text-2xl font-medium text-stone-500 max-md:max-w-full">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/eb62179562f944abbe4ced56301db351/42e5619e6985a872cc0fd9bdbc49bf7fb63933932cd0bba2ca484bec765e0165?apiKey=eb62179562f944abbe4ced56301db351&"
            alt="Company Logo"
            className="object-contain self-stretch aspect-[3.6] w-[263px]"
          />
          <a href="/" className="mt-9 text-sky-950">
            Home
          </a>
          <a href="/tests" className="mt-9 basis-auto">
            Recent Tests
          </a>
          <a href="/dashboard" className="mt-9 basis-auto">
            Dashboard
          </a>
        </nav>
        <div className="flex gap-10 self-start mt-1">
          <button className="flex gap-2 items-center px-6 py-2 my-auto text-xl font-medium bg-sky-200 rounded-3xl text-sky-950 max-md:px-5">
            <span className="self-stretch my-auto">Create Class</span>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/eb62179562f944abbe4ced56301db351/89d7ca34115fe2cbf09b3cd8cdb651e5fbc563d1cc485f21c27c7bb8af9f2ac7?apiKey=eb62179562f944abbe4ced56301db351&"
              alt=""
              className="object-contain shrink-0 self-stretch my-auto aspect-square w-[30px]"
            />
          </button>
          <div className="px-2.5 text-3xl font-bold text-white whitespace-nowrap bg-orange-700 rounded-full h-[65px] w-[65px]">
            DS
          </div>
        </div>
      </header>
      <main className="z-10 w-full max-w-[1418px] max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <nav className="flex flex-col w-[17%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow px-5 pt-11 w-full text-base font-medium whitespace-nowrap bg-slate-50 pb-[475px] text-stone-500 max-md:px-5 max-md:pb-24 max-md:mt-10">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/eb62179562f944abbe4ced56301db351/f00d5ecf4f22afb43febc7e759de01190268358040302202b8006b3905922e48?apiKey=eb62179562f944abbe4ced56301db351&"
                alt=""
                className="object-contain aspect-square w-[35px]"
              />
              <div className="flex flex-col items-start mt-16 w-full max-md:mt-10">
                <a
                  href="/students"
                  className="flex gap-3 items-center px-5 py-0.5 rounded-3xl bg-slate-50 max-md:px-5"
                >
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/eb62179562f944abbe4ced56301db351/efa17643c828e9e78aeb382f9e57e7c7d5e3e442c0e370c2908e7465e133fd53?apiKey=eb62179562f944abbe4ced56301db351&"
                    alt=""
                    className="object-contain shrink-0 self-stretch my-auto w-8 aspect-square"
                  />
                  <span className="self-stretch my-auto">Students</span>
                </a>
                <a
                  href="/tests"
                  className="flex gap-3 items-center px-5 py-0.5 mt-9 rounded-3xl bg-slate-50 max-md:px-5"
                >
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/eb62179562f944abbe4ced56301db351/d6febe54c7d606e688e76d2022c1d4dc45662b80b0c024a31149893a0ea65641?apiKey=eb62179562f944abbe4ced56301db351&"
                    alt=""
                    className="object-contain shrink-0 self-stretch my-auto w-8 aspect-square"
                  />
                  <span className="self-stretch my-auto">Tests</span>
                </a>
                <a
                  href="/resources"
                  className="flex gap-3 items-center px-5 py-0.5 mt-9 bg-blue-100 rounded-3xl text-sky-950 max-md:px-5"
                >
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/eb62179562f944abbe4ced56301db351/55e955227021f0e9e9fb1ed4755a68150e7b4821cab24f6059ea693931a33334?apiKey=eb62179562f944abbe4ced56301db351&"
                    alt=""
                    className="object-contain shrink-0 self-stretch my-auto w-8 aspect-square"
                  />
                  <span className="self-stretch my-auto">Resource</span>
                </a>
                <a
                  href="/assignments"
                  className="flex gap-3 items-center self-stretch px-5 py-0.5 mt-9 w-full rounded-3xl bg-slate-50 max-md:px-5"
                >
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/eb62179562f944abbe4ced56301db351/4af8f1fdf57dd401e9be7421b5d00790093309ca96df6be897d1c6e2b13abcf9?apiKey=eb62179562f944abbe4ced56301db351&"
                    alt=""
                    className="object-contain shrink-0 self-stretch my-auto w-8 aspect-square"
                  />
                  <span className="self-stretch my-auto">Assignment</span>
                </a>
              </div>
            </div>
          </nav>
          <section className="flex flex-col ml-5 w-[83%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col mt-14 w-full max-md:mt-10 max-md:max-w-full">
              <div className="w-full max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col">
                  <div className="flex flex-col w-[84%] max-md:ml-0 max-md:w-full">
                    <div className="grow mt-2.5 max-md:mt-10 max-md:max-w-full">
                      <div className="flex gap-5 max-md:flex-col">
                        {resources.map((resource, index) => (
                          <div
                            key={index}
                            className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full"
                          >
                            <ResourceCard
                              fileName={resource.fileName}
                              description={resource.description}
                              onCreateTest={() => handleCreateTest(resource.id)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col ml-5 w-[16%] max-md:ml-0 max-md:w-full">
                    <button
                      onClick={handleSendFiles}
                      className="gap-2 self-stretch px-6 py-2 w-full text-2xl font-medium text-white bg-green-600 rounded-3xl max-md:px-5 max-md:mt-10"
                    >
                      Send files
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
