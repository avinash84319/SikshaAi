import * as React from 'react'
import { useState } from 'react'

const searchCont = {
  display: 'flex',
  flexDirection: 'row',
  gap: '2rem',
}
const forminput = {
  overflow: 'hidden',
  flexGrow: 1,
  paddingLeft: '2.25rem',
  paddingRight: '2.25rem',
  paddingTop: '1.5rem',
  paddingBottom: '1.5rem',
  backgroundColor: 'white',
  borderRadius: '1.5rem',
  boxShadow: '-4px 4px 30px rgba(0, 0, 0, 0.25)',
  width: 'fit-content',
}
const listEle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '2rem', // gap-8 (8 * 0.25rem = 2rem)
  marginTop: '2rem', // mt-8 (8 * 0.25rem = 2rem)
  color: '#0c4a6e', // text-sky-950 (Sky-950 color in HEX)
}
const listele2 = {
  display: 'flex',

  gap: '2.5rem',
  paddingLeft: '1.75rem',
  paddingRight: '1.75rem',
  paddingTop: '1.5rem',
  paddingBottom: '1.5rem',
  backgroundColor: '#F1F5F9',
  borderRadius: '1.5rem',
  boxShadow: '-4px 4px 30px rgba(0, 0, 0, 0.25)',
  width: '47%',
}
const checkboxStyle = {
  display: 'flex',
  flexShrink: 0,
  width: '2rem',
  backgroundColor: 'white',
  borderRadius: '0.125rem',
  border: '3px solid #A3BFFA',
}

export function StudentClassList({
  classes,
  students,
  selectedClasses,
  setSelectedClasses,
  selectedStudents,
  setSelectedStudents,
}) {
  const [searchClass, setSearchClass] = useState('')
  const [searchStudent, setSearchStudent] = useState('')

  const toggleClassSelection = (id) => {
    setSelectedClasses((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const toggleStudentSelection = (id) => {
    setSelectedStudents((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  return (
    <section className="student-classlist" style={{ marginTop: '4rem' }}>
      <div className="" style={searchCont}>
        <input
          type="text"
          value={searchClass}
          onChange={(e) => setSearchClass(e.target.value)}
          placeholder="Search Class name"
          className="form-input"
          style={forminput}
        />
        <input
          type="text"
          value={searchStudent}
          onChange={(e) => setSearchStudent(e.target.value)}
          placeholder="Search Student Name"
          className="form-input"
          style={forminput}
        />
      </div>

      <h3>Classes</h3>
      {classes
        .filter((cls) =>
          cls.name.toLowerCase().includes(searchClass.toLowerCase())
        )
        .map((cls) => (
          <div key={cls.id} className="" style={listEle}>
            <input
              type="checkbox"
              checked={selectedClasses.includes(cls.id)}
              onChange={() => toggleClassSelection(cls.id)}
              style={checkboxStyle}
            />
            {cls.name} ({cls.description})
          </div>
        ))}

      <h3>Students</h3>
      {students
        .filter((std) =>
          std.name.toLowerCase().includes(searchStudent.toLowerCase())
        )
        .map((std) => (
          <div key={std.id} className="" style={listEle}>
            <input
              type="checkbox"
              checked={selectedStudents.includes(std.id)}
              onChange={() => toggleStudentSelection(std.id)}
              style={checkboxStyle}
            />
            {std.name}
          </div>
        ))}
    </section>
  )
}
