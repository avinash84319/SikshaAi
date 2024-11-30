import * as React from 'react'
const input = {
  paddingLeft: '2.25rem',
  paddingRight: '2.25rem',
  paddingTop: '1.5rem',
  paddingBottom: '1.5rem',
  backgroundColor: 'white',
  borderRadius: '0.8rem',
  boxShadow: '-4px 4px 10px rgba(0, 0, 0, 0.25)',
  width: 'fit-content',
}
export default function SearchBox({ placeholder }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="search-input"
      style={input}
      aria-label={placeholder}
    />
  )
}
