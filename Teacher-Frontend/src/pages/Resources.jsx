import * as React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import SearchBox from '../components/builder-components/Materials/SearchBox'
import StudentClassBox from '../components/builder-components/Materials/StudentClassBox'

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
const sectionStyle = {
  display: 'flex',
  flexDirection: 'column',
  marginTop: 'auto',
  marginBottom: 'auto',
  color: '#0c4a6e', // Tailwind `text-sky-950`
}
const dropZone = {
  padding: '1.5rem',
  fontSize: '1.25rem',
  fontWeight: 500,
  borderRadius: '0.8rem',
  borderWidth: '1px',
  borderStyle: 'dashed',
  borderColor: '#3f3f46',
  minHeight: '178px',
  color: '#78716c',
  textAlign: 'center',
  cursor: 'pointer',
  width: '90%',
  alignSelf: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}
const searchCont = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  gap: '2rem',
  margin: '2.5rem',
  color: '#78716c',
}
const main = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '1.25rem',
  justifyContent: 'center',
  width: '100%',
  fontSize: '1.25rem',
  fontWeight: 500,
  // maxWidth: "1418px",
  overflowY: 'auto',
}
const Resource = {
  width: '100%',
}
const classStudentCont = {
  display: 'flex',
  flexDirection: 'row',
  gap: '1.25rem',
  justifyContent: 'space-around',
}
const Cont = {
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  marginTop: '2rem',
}
const droppedfiles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}

export default function Resources() {
  const [teacherId, setTeacherId] = useState('12345678')
  const [files, setFiles] = useState([])
  const [classes, setClasses] = useState([])
  const [students, setStudents] = useState([])
  const [selectedClasses, setSelectedClasses] = useState([])
  const [selectedStudents, setSelectedStudents] = useState([])

  const fetchData = async () => {
    try {
      // Fetch classes
      const classResponse = await axios.get(
        `https://pet-muskox-honestly.ngrok-free.app/api/getTeachersClasses?user_id=${teacherId}`,
        {
          headers: {
            'ngrok-skip-browser-warning': '69420',
          },
        }
      )

      // Map the classes into a usable format
      const formattedClasses = classResponse.data.classes.map((cls) => ({
        id: cls[0], // Class ID
        teacherId: cls[1], // Teacher ID
        name: cls[2], // Class Name
        description: cls[3], // Class Description
      }))
      setClasses(formattedClasses)

      // Fetch students
      const studentResponse = await axios.get(
        `https://pet-muskox-honestly.ngrok-free.app/api/getAllStudents?user_id=${teacherId}`,
        {
          headers: {
            'ngrok-skip-browser-warning': '69420',
          },
        }
      )

      // Map the students into a usable format
      const formattedStudents = studentResponse.data.students.map((std) => ({
        id: std[0], // Student ID
        name: std[1], // Student Name
        classId: std[2], // Class ID associated with the student
      }))
      setStudents(formattedStudents)
    } catch (error) {
      console.error('Error fetching classes or students', error)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  // Handle file drop and convert to Base64
  const handleFileDrop = async (e) => {
    e.preventDefault()
    const droppedFiles = Array.from(e.dataTransfer.files)

    const base64Files = await Promise.all(
      droppedFiles.map(async (file) => {
        const base64 = await convertFileToBase64(file)
        return { fileName: file.name, base64: base64 }
      })
    )

    setFiles(base64Files)
  }

  // Convert file to Base64
  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
      reader.readAsDataURL(file)
    })
  }

  const handleRemoveFile = (fileName) => {
    setFiles((prevFiles) =>
      prevFiles.filter((file) => file.fileName !== fileName)
    )
  }

  // Handle the selection of classes or students
  const handleClassSelection = (classId) => {
    setSelectedClasses((prev) =>
      prev.includes(classId)
        ? prev.filter((id) => id !== classId)
        : [...prev, classId]
    )
  }

  const handleStudentSelection = (studentId) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    )
  }

  // Handle file send
  const handleSendFiles = async () => {
    if (
      !teacherId ||
      !selectedClasses.length ||
      !selectedStudents.length ||
      files.length === 0
    ) {
      alert(
        'Please ensure you have selected classes, students, and uploaded files.'
      )
      return
    }

    const payload = {
      teacherId: teacherId,
      classIds: selectedClasses,
      studentIds: selectedStudents,
      files: files, // This contains { fileName, base64 }
    }

    try {
      const response = await fetch(
        'https://pet-muskox-honestly.ngrok-free.app/api/uploadMaterial',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      )

      if (response.ok) {
        alert('Files sent successfully!')
      } else {
        alert('Failed to send files.')
      }
    } catch (error) {
      console.error('Error sending files', error)
      alert('Error sending files.')
    }
  }

  return (
    <div className="resource-page" style={Resource}>
      <main className="resource-main" style={main}>
        <section className="resource-section" style={sectionStyle}>
          {/* <button onClick={() => fetchData()}>Get data</button> */}

          {/* DropZone */}
          <div
            className="resource-dropzone"
            style={dropZone}
            onDrop={handleFileDrop}
            onDragOver={(e) => e.preventDefault()}
            role="button"
            tabIndex="0"
          >
            Drag files here to add them to your repository
          </div>

          {/* File Preview */}
          <div className="file-preview" style={droppedfiles}>
            <h3>Dropped Files</h3>
            {files.length > 0 ? (
              <ul>
                {files.map((file, index) => (
                  <li key={index}>
                    {file.fileName} ({(file.base64.length / 1024).toFixed(2)}{' '}
                    KB)
                    <span
                      onClick={() => handleRemoveFile(file.fileName)}
                      style={{ cursor: 'pointer' }}
                    >
                      &#x274c;
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No files uploaded yet.</p>
            )}
          </div>

          {/* Search Boxes */}
          <div className="search-cont" style={searchCont}>
            <SearchBox placeholder="Search Class name" />
            <SearchBox placeholder="Search Student Name" />
          </div>

          <div style={classStudentCont}>
            {/* Display Classes */}
            <div className="class-student-cont" style={Cont}>
              {classes.map((cls) => (
                <div key={cls.id}>
                  <StudentClassBox
                    key={cls.id}
                    text={`${cls.name} (${cls.description})`}
                    onClick={() => handleClassSelection(cls.id)}
                    selected={selectedClasses.includes(cls.id)}
                  />
                </div>
              ))}
            </div>

            {/* Display Students */}
            <div className="class-student-cont" style={Cont}>
              {students.map((student) => (
                <div key={student.id}>
                  <StudentClassBox
                    key={student.id}
                    text={`${student.name} (Class: ${student.classId})`}
                    onClick={() => handleStudentSelection(student.id)}
                    selected={selectedStudents.includes(student.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <button
          onClick={handleSendFiles}
          className="resource-btn"
          style={buttonStyle}
        >
          Send files
        </button>
      </main>
    </div>
  )
}
