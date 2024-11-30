import React, { useEffect, useState } from 'react'
// import { auth } from './firebase'

const Profile = () => {
  const [userDetails, setUserDetails] = useState(null)

  useEffect(() => {
    setUserDetails({
      name: window.localStorage.getItem('name'),
      email: window.localStorage.getItem('email'),
      photoURL: window.localStorage.getItem('photoUrl'),
    })
  }, [])

  const handleLogout = async () => {
    try {
      localStorage.clear()
      window.location.href = '/'
      console.log('User logged out successfully')
    } catch (err) {
      console.log('Error logging out', err.message)
    }
  }

  return (
    <section className="flex flex-col items-center justify-center min-h-screen p-4 sm:-mt-16">
      {userDetails ? (
        <div className="bg-tertiary shadow-lg rounded-lg p-6 max-w-sm w-full">
          {userDetails.photoURL && (
            <img
              src={userDetails.photoURL}
              alt={userDetails.name}
              className="w-24 h-24 rounded-full mx-auto"
            />
          )}
          <h2 className="text-xl font-semibold text-center mt-4">
            Welcome, {userDetails.name}
          </h2>
          <p className="text-gray-600 text-center">
            Email: {userDetails.email}
          </p>
          <button
            onClick={handleLogout}
            className="mt-6 w-full py-2 px-4 bg-primary text-white rounded hover:bg-white hover:text-primary hover:border-2 rounded-md transition-colors"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="text-gray-500">Loading...</div>
      )}
    </section>
  )
}

export default Profile
