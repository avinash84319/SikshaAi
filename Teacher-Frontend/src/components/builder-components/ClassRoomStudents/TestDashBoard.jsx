import React, { useState } from 'react'
import TestCard from './TestCard'
import SidebarItem from './SidebarItem'

const TestDashboard = () => {
  const [tests] = useState([
    {
      title: 'Periodic Test 1',
      className: 'Class Name',
      fileName: 'Ml algorithems.pdf',
      dateTime: '25/11/2024 - 11:30pm',
    },
    {
      title: 'Periodic Test 1',
      className: 'Class Name',
      fileName: 'Ml algorithems.pdf',
      dateTime: '25/11/2024 - 11:30pm',
    },
    {
      title: 'Periodic Test 1',
      className: 'Class Name',
      fileName: 'Ml algorithems.pdf',
      dateTime: '25/11/2024 - 11:30pm',
    },
    {
      title: 'Periodic Test 1',
      className: 'Class Name',
      fileName: 'Ml algorithems.pdf',
      dateTime: '25/11/2024 - 11:30pm',
    },
  ])

  const sidebarItems = [
    {
      icon: 'https://cdn.builder.io/api/v1/image/assets/eb62179562f944abbe4ced56301db351/3ec1788a172224704826977c66474c2f1137aec628b4cb49c61ce519c5914c17?apiKey=eb62179562f944abbe4ced56301db351&',
      label: 'Students',
      isActive: false,
    },
    {
      icon: 'https://cdn.builder.io/api/v1/image/assets/eb62179562f944abbe4ced56301db351/a0f7fe26b5ec5ef5578fe1efef3a7d19a288c7629b852b55eb3450f7cdbe928d?apiKey=eb62179562f944abbe4ced56301db351&',
      label: 'Tests',
      isActive: true,
    },
    {
      icon: 'https://cdn.builder.io/api/v1/image/assets/eb62179562f944abbe4ced56301db351/f3f1682b6d69b6a8195c9bf71e00b3cd398f83bc7e0a7a08ea78890155c32bed?apiKey=eb62179562f944abbe4ced56301db351&',
      label: 'Resource',
      isActive: false,
    },
    {
      icon: 'https://cdn.builder.io/api/v1/image/assets/eb62179562f944abbe4ced56301db351/4af8f1fdf57dd401e9be7421b5d00790093309ca96df6be897d1c6e2b13abcf9?apiKey=eb62179562f944abbe4ced56301db351&',
      label: 'Assignment',
      isActive: false,
    },
  ]

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
          <a href="#" className="mt-9 text-sky-950">
            Home
          </a>
          <a href="#" className="mt-9 basis-auto">
            Recent Tests
          </a>
          <a href="#" className="mt-9 basis-auto">
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
      <main className="z-10 w-full max-w-[1155px] max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <aside className="flex flex-col w-[22%] max-md:ml-0 max-md:w-full">
            <nav className="flex flex-col grow px-5 pt-11 w-full text-base font-medium whitespace-nowrap bg-slate-50 pb-[475px] text-stone-500 max-md:px-5 max-md:pb-24 max-md:mt-10">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/eb62179562f944abbe4ced56301db351/2d8998ddbfcdf93e7a7bb4b40196515c0b60749dfc548fcc53fc96d0b6220017?apiKey=eb62179562f944abbe4ced56301db351&"
                alt=""
                className="object-contain aspect-square w-[35px]"
              />
              <div className="flex flex-col items-start mt-16 w-full max-md:mt-10">
                {sidebarItems.map((item, index) => (
                  <SidebarItem
                    key={index}
                    icon={item.icon}
                    label={item.label}
                    isActive={item.isActive}
                  />
                ))}
              </div>
            </nav>
          </aside>
          <section className="flex flex-col ml-5 w-[78%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col self-stretch my-auto max-md:mt-10 max-md:max-w-full">
              {tests.map((test, index) => (
                <div key={index} className={index > 0 ? 'mt-8' : ''}>
                  <TestCard {...test} />
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default TestDashboard
