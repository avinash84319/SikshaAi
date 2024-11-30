import React, { useState } from 'react'
import axios from 'axios'

function MessageInput() {
  const [message, setMessage] = useState('')

  const handleSendMessage = async () => {
    if (!message.trim()) return

    try {
      await axios.post('/api/messages', {
        content: message,
        timestamp: new Date().toISOString(),
      })
      setMessage('')
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  return (
    <div className="flex flex-col ml-5 w-[57%] max-md:ml-0 max-md:w-full">
      <div className="flex overflow-hidden flex-wrap gap-10 px-9 py-2 w-full text-2xl bg-white rounded-3xl mt-[759px] shadow-[-4px_4px_30px_rgba(0,0,0,0.25)] text-stone-500 max-md:px-5 max-md:mt-10 max-md:max-w-full">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="my-auto flex-grow outline-none"
          placeholder="Type a message"
        />
        <button onClick={handleSendMessage}>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/77b6fde51ec5e9c82e9921d1048b1b28e3601d8bc09870fe556f9050b8505ffa?placeholderIfAbsent=true&apiKey=e40ab9010b324a23beb46e8f03978627"
            className="object-contain shrink-0 aspect-square w-[50px]"
            alt="Send message"
          />
        </button>
      </div>
    </div>
  )
}

export default MessageInput
