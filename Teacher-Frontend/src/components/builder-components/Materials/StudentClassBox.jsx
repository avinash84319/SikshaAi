import * as React from 'react'

const StudentClass = {
  display: 'flex',
  gap: '2.5rem',
  paddingLeft: '1.75rem',
  paddingRight: '1.75rem',
  paddingTop: '1.5rem',
  paddingBottom: '1.5rem',
  borderRadius: '0.8rem',
  backgroundColor: '#F1F5F9',
  boxShadow: '-4px 4px 10px rgba(0, 0, 0, 0.25)',
}

export default function StudentClassBox({ text, onClick, selected }) {
  return (
    <div
      className={`StudentClass ${selected ? 'selected' : ''}`} // Add a class if selected
      style={{
        ...StudentClass,
        backgroundColor: selected ? '#d3f4ff' : 'white', // Highlight if selected
        cursor: 'pointer', // Indicate clickable area
      }}
      onClick={onClick} // Handle clicks
    >
      <div>{text}</div>
    </div>
  )
}
