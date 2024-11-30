import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Classes() {
  const [classes, setClasses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const fileDetails = useSelector((state) => state.sections)

  // Fetching class data from backend using the user_id
  useEffect(() => {
    console.log(fileDetails.sections)
    const fetchClasses = async () => {
      const user_id =  fileDetails.user_id || '12345678'

      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_HOST
          }/api/getTeachersClasses?user_id=${user_id}`,
          {
            headers: {
              'ngrok-skip-browser-warning': '69420',
            },
          }
        )
        console.log('Classes:', response.data.classes)
        setClasses(response.data.classes) // Set the fetched classes
        setLoading(false) // Update loading state
      } catch (error) {
        setError(error) // Set error state
        setLoading(false) // Update loading state
      }
    }

    fetchClasses() // Call the async function
  }, [])

  // Navigate to student list on class click
  const handleClassClick = (classId) => {
    // console.log('Class clicked:', classId)
    navigate(`/classStudents/${classId}`)
  }

  return (
    <div className="flex flex-wrap gap-6 p-5 justify-center min-h-screen bg-white w-full">
      {loading ? (
        <h1>Loading Classes...</h1>
      ) : error ? (
        <h1>Error fetching data</h1>
      ) : (
        classes.map((classItem) => (
          <div
            key={classItem[0]}
            className="flex flex-col items-center justify-center w-52 h-40  bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => handleClassClick(classItem[0])}
          >
            <div className="flex items-center justify-center w-16 h-16 mb-3 bg-blue-500 text-white rounded-full">
              {classItem[2].charAt(0).toUpperCase()}
            </div>
            <h2 className="text-lg font-semibold text-gray-800">
              {classItem[2]}
            </h2>
            <p className="text-sm text-gray-500">{classItem[3]}</p>
          </div>
        ))
      )}
    </div>
  )
}

export default Classes
