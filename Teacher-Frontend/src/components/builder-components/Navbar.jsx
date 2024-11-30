// Navbar.js
import * as React from 'react'

function Navbar() {
  return (
    <header className="flex  items-end gap-5 justify-between px-10 pb-2 w-full bg-slate-50 shadow-[0px_4px_8px_rgba(0,0,0,0.15)] max-md:px-5 max-md:max-w-full mb-2">
      <nav className="flex gap-9 items-end text-base font-medium text-stone-500 max-md:max-w-full">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/eb62179562f944abbe4ced56301db351/42e5619e6985a872cc0fd9bdbc49bf7fb63933932cd0bba2ca484bec765e0165?apiKey=eb62179562f944abbe4ced56301db351&"
          alt="Company logo"
          className="object-contain self-stretch aspect-[3.6] w-[180px]"
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
      <div className="flex items-end py-2 gap-10   self-start mt-1">
        {/* <button
          className="flex gap-2 items-center px-6 py-2 my-auto text-base  bg-sky-200 rounded-3xl text-sky-950 max-md:px-2"
          onClick={() => console.log('Create class clicked')}
        >
          <span className="self-stretch my-auto">Create Class</span>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/eb62179562f944abbe4ced56301db351/89d7ca34115fe2cbf09b3cd8cdb651e5fbc563d1cc485f21c27c7bb8af9f2ac7?apiKey=eb62179562f944abbe4ced56301db351&"
            alt=""
            className="object-contain shrink-0 self-stretch my-auto aspect-square w-[20px]"
          />
        </button> */}
        <div className="px-2.5 text-xl font-bold text-white whitespace-nowrap bg-orange-700 rounded-full h-[40px] w-[40px] flex items-center justify-center">
          DS
        </div>
      </div>
    </header>
  )
}

export default Navbar
