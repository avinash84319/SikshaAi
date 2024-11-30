import React from 'react'
import { useNavigate } from 'react-router-dom'

const menuItems = [
  {
    icon: '/selected-icon-sidebar/classroom.svg',
    label: 'Classrooms',
    route: '/classRoom',
  },
  {
    icon: '/selected-icon-sidebar/Students.svg',
    label: 'Students',
    route: '/students',
  },
  {
    icon: '/selected-icon-sidebar/resource.svg',
    label: 'Resource',
    route: '/resource',
  },
  {
    icon: '/selected-icon-sidebar/assignment.svg',
    label: 'Assignment',
    route: '/assignment',
  },
  {
    icon: '/selected-icon-sidebar/create_test.svg',
    label: 'Create Test',
    route: '/upload-file',
  },
  { icon: '/selected-icon-sidebar/doubts.svg', label: 'Doubts', route: '/doubts' },
]

function Sidebar() {
  const navigate = useNavigate()

  const handleNavigation = (route) => {
    navigate(route) // Navigate to the respective route
  }

  return (
    <aside className="flex flex-col w-[15%] max-md:ml-0 max-md:w-full">
      <nav className="flex flex-col grow px-5 w-full text-base font-medium bg-slate-50 text-stone-500 max-md:px-5 max-md:pb-24 max-md:mt-10">
        <div className="flex flex-col mt-16 w-full max-md:mt-10">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className={`flex gap-3 items-center px-5 py-0.5 mt-9 whitespace-nowrap rounded-3xl ${
                window.location.pathname === item.route
                  ? 'bg-blue-100 text-sky-950'
                  : 'bg-slate-50'
              } ${index === 0 ? 'mt-0' : ''}`}
              onClick={() => handleNavigation(item.route)}
            >
              <img
                loading="lazy"
                src={item.icon}
                alt=""
                className="object-contain shrink-0 self-stretch my-auto w-8 aspect-square"
              />
              <span className="self-stretch my-auto">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </aside>
  )
}

export default Sidebar
