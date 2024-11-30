import * as React from 'react'
import axios from 'axios'
import { useState } from 'react'

const form = {
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'stretch',
  marginTop: 'auto',
  marginBottom: 'auto',
  width: '100%',
  fontSize: '1.5rem',
  color: '#78716c',
}
const formShorttext = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '2.5rem',
  width: '100%',
}
const forminput = {
  overflow: 'hidden',
  flexGrow: 1,
  paddingLeft: '2.5rem',
  paddingRight: '2.5rem',
  paddingTop: '0.25rem',
  paddingBottom: '0.25rem',
  backgroundColor: 'white',
  borderRadius: '0.8rem',
  boxShadow: '-4px 4px 10px rgba(0, 0, 0, 0.25)',
  width: 'fit-content',
}
const formselect = {
  display: 'flex',
  overflow: 'hidden',
  flex: '1 1 auto',
  gap: '2.5rem',
  paddingTop: '1rem',
  paddingBottom: '1rem',
  paddingRight: '1.25rem',
  paddingLeft: '2.5rem',
  backgroundColor: 'white',
  borderRadius: '0.8rem',
  boxShadow: '-4px 4px 10px rgba(0, 0, 0, 0.25)',
}
const formTextarea = {
  overflow: 'hidden',
  paddingLeft: '1.5rem',
  paddingRight: '1.5rem',
  paddingTop: '1.25rem',
  paddingBottom: '4rem',
  marginTop: '1.5rem',
  backgroundColor: 'white',
  borderRadius: '0.8rem',
  boxShadow: '-4px 4px 10px rgba(0, 0, 0, 0.25)',
}
const buttonStyle = {
  display: 'flex',
  gap: '0.5rem',
  alignSelf: 'flex-start',
  padding: '0.5rem 1.5rem',
  margin: '3.5rem',
  color: 'white',
  backgroundColor: '#16a34a',
  borderRadius: '0.8rem',
}

export function AssignmentForm({
  selectedClasses,
  selectedStudents,
  teacherId,
}) {
  const [assignmentName, setAssignmentName] = useState('')
  const [assignmentType, setAssignmentType] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!assignmentName || !assignmentType || !description) {
      alert('Please fill out all fields.')
      return
    }

    if (selectedClasses.length === 0 || selectedStudents.length === 0) {
      alert('Please select at least one class and one student.')
      return
    }

    const payload = {
      due_date: '10/10/24',
      teacherId: teacherId,
      title: assignmentName,
      type: assignmentType,
      description: description,
      classIds: selectedClasses,
      studentIds: selectedStudents,
    }

    try {
      const response = await axios.post(
        'https://pet-muskox-honestly.ngrok-free.app/api/createAssignment',
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (response.status === 200) {
        alert('Assignment sent successfully!')
      } else {
        alert('Failed to send the assignment.')
      }
    } catch (error) {
      console.log('Error sending assignment:', error)
      alert('An error occurred while sending the assignment.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="assignment-form" style={form}>
      <div className="assignment-form-short-text" style={formShorttext}>
        <input
          type="text"
          value={assignmentName}
          onChange={(e) => setAssignmentName(e.target.value)}
          placeholder="Assignment Name"
          className="assignment-form-input"
          style={forminput}
        />
        <select
          value={assignmentType}
          onChange={(e) => setAssignmentType(e.target.value)}
          className=""
          style={formselect}
        >
          <option value="">Select Type</option>
          <option value="homework">Homework</option>
          <option value="project">Project</option>
          <option value="quiz">Quiz</option>
        </select>
      </div>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Assignment Description"
        className=""
        style={formTextarea}
      />
      <button type="submit" className="send-btn" style={buttonStyle}>
        Send Assignment
      </button>
    </form>
  )
}
