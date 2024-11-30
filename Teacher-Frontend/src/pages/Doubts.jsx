import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import MessageList from './MessageList'
import MessageInput from './MessageInput'

function Doubts() {
  return (
    <div className="flex overflow-hidden flex-col bg-white">
      <Navbar />
      <div className="z-10 w-full max-w-[1476px] max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <div className="flex flex-col w-[43%] max-md:ml-0 max-md:w-full">
            <div className="grow max-md:mt-9 max-md:max-w-full">
              <div className="flex gap-5 max-md:flex-col">
                <Sidebar />
                <MessageList />
              </div>
            </div>
          </div>
          <MessageInput />
        </div>
      </div>
    </div>
  )
}

export default Doubts
