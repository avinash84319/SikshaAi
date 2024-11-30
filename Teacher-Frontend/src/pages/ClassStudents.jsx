import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { FiEye } from 'react-icons/fi'

function ClassStudents() {
  const { classId } = useParams()
  const [students, setStudents] = useState([])
  const [studentVisibility, setStudentVisibility] = useState({})
  const [loadingState, setLoadingState] = useState({})
  const [selectedStudents, setSelectedStudents] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const fileDetails = useSelector((state) => state.sections)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_HOST
          }/api/getClassStudents?class_id=${classId}`,
          {
            headers: { 'ngrok-skip-browser-warning': '69420' },
          }
        )
        const studentsData = response.data.students

        for (const student of studentsData) {
          student.push(null) // for storing the test id
        }

        setStudents(studentsData)

        const initialVisibilityState = {}
        const initialSelectionState = {}
        studentsData.forEach((student) => {
          initialVisibilityState[student[0]] = false // Eye icon hidden
          initialSelectionState[student[0]] = false // Not selected
        })
        setStudentVisibility(initialVisibilityState)
        setSelectedStudents(initialSelectionState)
        setLoading(false)
      } catch (error) {
        setError(error)
        setLoading(false)
      }
    }

    fetchStudents()
  }, [classId])

  const handleStudentSelection = (studentId) => {
    setSelectedStudents((prevState) => ({
      ...prevState,
      [studentId]: !prevState[studentId],
    }))
  }

  const handleSelectAll = () => {
    const allSelected = Object.values(selectedStudents).every(
      (isSelected) => isSelected
    )
    const updatedSelectionState = {}
    students.forEach((student) => {
      updatedSelectionState[student[0]] = !allSelected // Toggle all
    })
    setSelectedStudents(updatedSelectionState)
  }

  const handleSubmit = async () => {
    const userId = fileDetails.user_id || '12345678'
    const pdf_id = fileDetails.pdf_id

    for (let student of students) {
      const studentId = student[0]
      if (selectedStudents[studentId] && !studentVisibility[studentId]) {
        try {
          // Set loading state for the current student
          setLoadingState((prevState) => ({
            ...prevState,
            [studentId]: true,
          }))

          const response = await axios.post(
            `${import.meta.env.VITE_HOST}/api/createTest`,
            {
              student_id: studentId,
              user_id: userId,
              description: 'Test Description',
              test_name: 'Test 1',
              pdf_id: pdf_id || 'fc5e558e-b1d7-44df-800e-d0c9cef2acfa',
            }
          )

          if (response.status === 200) {
            const test_id = response.data.id
            student[3] = test_id
            console.log(student[3])

            const sections = fileDetails.sections
            for (const section of sections) {
              const section_id = section.section_id
              const instruction=section.instructions
              const topics = section.selectedTopics

              await axios.post(
                `${import.meta.env.VITE_HOST}/api/generateQuestions`,
                {
                  test_id: test_id,
                  section_id: section_id,
                  user_id: userId,
                  pdf_id: pdf_id || 'fc5e558e-b1d7-44df-800e-d0c9cef2acfa',
                  student_id: studentId,
                  topics: topics,
                  instruction:instruction
                }
              )
            }

            setStudentVisibility((prevState) => ({
              ...prevState,
              [studentId]: true,
            }))
          } else {
            alert(`Error creating test for student ${studentId}`)
          }
        } catch (error) {
          console.error(`Error fetching data for student ${studentId}:`, error)
        } finally {
          // Clear the loading state for the student
          setLoadingState((prevState) => ({
            ...prevState,
            [studentId]: false,
          }))
        }
      }
    }
  }

  return (
    <div className="gap-6 p-5 justify-center min-h-screen bg-white w-full">
      <h1 className="text-2xl text-center font-semibold mb-4">Student List</h1>
      {loading ? (
        <h1>Loading students...</h1>
      ) : error ? (
        <h1>Error fetching data</h1>
      ) : students.length > 0 ? (
        <>
          <div className="flex items-center gap-4 mb-4">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-600 rounded"
              onChange={handleSelectAll}
              checked={Object.values(selectedStudents).every(
                (isSelected) => isSelected
              )}
            />
            <span className="text-lg font-medium text-gray-800">
              Select All
            </span>
          </div>
          <div className="flex flex-wrap gap-y-6 gap-x-8  p-8 max-w-screen max-h-screen overflow-auto">
            {students.map((student) => (
              <div
                key={student[0]}
                className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 w-[300px]"
              >
                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-600 rounded"
                    checked={selectedStudents[student[0]] || false}
                    onChange={() => handleStudentSelection(student[0])}
                    disabled={studentVisibility[student[0]]}
                  />
                  <span className="text-lg font-medium text-gray-800">
                    {student[1]}
                  </span>
                </div>
                {loadingState[student[0]] && (
                  <iframe
                    src="https://lottie.host/embed/db826e11-f115-409a-a753-c68932c1d9f7/NIVSeAiFIl.lottie"
                    width="40"
                    height="40"
                    frameBorder="0"
                  ></iframe>
                )}
                {studentVisibility[student[0]] && !loadingState[student[0]] && (
                  <FiEye
                    className="text-gray-500 cursor-pointer"
                    onClick={() =>
                      window.open(`/test-env?testId=${student[3]}`, '_blank')
                    }
                  />
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-center">
            <button
              onClick={handleSubmit}
              className={`bg-primary text-white py-2 px-4 rounded-lg hover:bg-secondary transition-colors duration-300 ${
                Object.values(selectedStudents).every(
                  (isSelected) => !isSelected
                )
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }`}
              disabled={Object.values(selectedStudents).every(
                (isSelected) => !isSelected
              )}
            >
              Create Test
            </button>
          </div>
        </>
      ) : (
        <h1>No students found for this class.</h1>
      )}
    </div>
  )
}

export default ClassStudents
