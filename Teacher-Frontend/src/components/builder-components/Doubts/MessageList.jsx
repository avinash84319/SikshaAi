import React, { useState, useEffect } from 'react'
import axios from 'axios'

function MessageList() {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('/api/messages')
        setMessages(response.data)
      } catch (error) {
        console.error('Error fetching messages:', error)
      }
    }

    fetchMessages()
  }, [])

  return (
    <div className="flex flex-col ml-5 w-[65%] max-md:ml-0 max-md:w-full">
      <div className="flex flex-col grow pt-12 pb-96 w-full bg-indigo-50 max-md:pb-24">
        <div className="flex flex-col w-full">
          {messages.map((message, index) => (
            <div
              key={index}
              className="flex overflow-hidden gap-5 justify-between items-start px-6 pt-1 pb-3.5 w-full bg-indigo-50 border-b-2 border-slate-50 max-md:px-5"
            >
              <div className="flex flex-col self-start text-sky-950">
                <div className="text-2xl">{message.studentName}</div>
                <div className="self-start mt-1.5 text-base">
                  {message.content}
                </div>
              </div>
              <div className="self-end mt-11 text-sm text-stone-500 max-md:mt-10">
                {message.timestamp}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MessageList
