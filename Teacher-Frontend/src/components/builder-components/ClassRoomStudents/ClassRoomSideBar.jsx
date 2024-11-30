import * as React from 'react'

const ClassRoomSidebar = () => {
  return (
    <nav className="flex flex-col grow px-5 pt-11 w-full text-base font-medium whitespace-nowrap bg-slate-50 pb-[475px] text-stone-500 max-md:px-5 max-md:pb-24 max-md:mt-10">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/eb62179562f944abbe4ced56301db351/6cb04d68adc291a4dc3a0903df9d3e8a521756700e833db202d5d0d1031c562a?apiKey=eb62179562f944abbe4ced56301db351&"
        alt="Menu icon"
        className="object-contain aspect-square w-[35px]"
      />
      <div className="flex flex-col items-start mt-16 w-full max-md:mt-10">
        <div className="flex gap-3 items-center px-5 py-0.5 bg-blue-100 rounded-3xl text-sky-950 max-md:px-5">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/eb62179562f944abbe4ced56301db351/be46e1bc5bb8d6011fe6b3f730f8affb0a2dc9babe1e0fa262c949c4fad05a96?apiKey=eb62179562f944abbe4ced56301db351&"
            alt="Students icon"
            className="object-contain shrink-0 self-stretch my-auto w-8 aspect-square"
          />
          <div className="self-stretch my-auto">Students</div>
        </div>
        <div className="flex gap-3 items-center px-5 py-0.5 mt-9 rounded-3xl bg-slate-50 max-md:px-5">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/eb62179562f944abbe4ced56301db351/f2f323b4df4b7a715d1cb94a8246d312490429283e7266a5bda125917b2578c0?apiKey=eb62179562f944abbe4ced56301db351&"
            alt="Tests icon"
            className="object-contain shrink-0 self-stretch my-auto w-8 aspect-square"
          />
          <div className="self-stretch my-auto">Tests</div>
        </div>
        <div className="flex gap-3 items-center px-5 py-0.5 mt-9 rounded-3xl bg-slate-50 max-md:px-5">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/eb62179562f944abbe4ced56301db351/82b1023cc07fa74a0b1439db3e22b55c5fc00fbc84895001ace15559e48e1d79?apiKey=eb62179562f944abbe4ced56301db351&"
            alt="Resource icon"
            className="object-contain shrink-0 self-stretch my-auto w-8 aspect-square"
          />
          <div className="self-stretch my-auto">Resource</div>
        </div>
        <div className="flex gap-3 items-center self-stretch px-5 py-0.5 mt-9 w-full rounded-3xl bg-slate-50 max-md:px-5">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/eb62179562f944abbe4ced56301db351/4af8f1fdf57dd401e9be7421b5d00790093309ca96df6be897d1c6e2b13abcf9?apiKey=eb62179562f944abbe4ced56301db351&"
            alt="Assignment icon"
            className="object-contain shrink-0 self-stretch my-auto w-8 aspect-square"
          />
          <div className="self-stretch my-auto">Assignment</div>
        </div>
      </div>
    </nav>
  )
}

export default ClassRoomSidebar
