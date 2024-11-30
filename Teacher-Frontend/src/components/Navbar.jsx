import React, { useState,useEffect } from 'react'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { handleNavClick, handleProfileClick } from './HandleNavBarClicks.jsx'
import { WindowSharp } from '@mui/icons-material'
import { current } from '@reduxjs/toolkit'



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Navbar() {
  const [currentPath,setCurrentPath] =useState( window.location.pathname)
  const navigation = [
    { name: 'New Project', href: '/upload-file', current: currentPath === '/upload-file'? true : false },
    { name: 'Past Projects', href: '/past-projects', current: currentPath === '/past-projects'? true : false },
  ]

  useEffect(() => { 
    setCurrentPath((prevPath) =>
      // console.log(prevPath)
      window.location.pathname
    )
    console.log(currentPath)
  }, [])

  const [imgSrc,setImgSrc] = useState(
    localStorage.getItem('photoUrl') || './default-pp.png'
  )
  useEffect(() => {
    setImgSrc(localStorage.getItem('photoUrl') || './default-pp.png')
  }, [localStorage.getItem('photoUrl')])

  const [navItems, setNavItems] = useState(navigation)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClick = (name) => {
    handleNavClick(name, setNavItems, dispatch, navigate)
  }

  return (
    <Disclosure as="nav" className="bg-primary">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    alt="Your Company"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    className="h-8 w-auto"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault() // Prevent default anchor behavior
                          handleClick(item.name)
                        }}
                        aria-current={item.current ? 'page' : undefined}
                        className={classNames(
                          item.current
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  {/* Optional: Notifications icon */}
                  {/* <span className="sr-only">View notifications</span>
                  <BellIcon aria-hidden="true" className="h-6 w-6" /> */}
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <MenuButton
                      className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      onClick={() => handleProfileClick(navigate)}
                    >
                      <span className="sr-only">Open user menu</span>
                      <img
                        alt=""
                        src={imgSrc}
                        className="h-8 w-8 rounded-full bg-white"
                      />
                    </MenuButton>
                  </div>
                  {/* Optionally add MenuItems if needed */}
                </Menu>
              </div>
            </div>
          </div>

          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navItems.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault() // Prevent default anchor behavior
                    handleClick(item.name)
                  }}
                  aria-current={item.current ? 'page' : undefined}
                  className={classNames(
                    item.current
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  )
}

export default Navbar
