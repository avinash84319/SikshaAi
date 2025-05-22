import React from 'react'
import { useNavigate } from 'react-router-dom'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from './FireBase'
import axios from 'axios' // Import your axios instance
import env from 'react-dotenv'


const GoogleSignIn = () => {

  const navigate=useNavigate()
  const googleLogin = async () => {
    const provider = new GoogleAuthProvider()
    try {
      const result = await signInWithPopup(auth, provider)
      console.log('result: ', result)
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const accessToken = credential.idToken
      console.log('accessToken: ', accessToken)
      console.log(import.meta.env)

      // Send the access token to your backend for verification
      let response = await axios.post(
        `${import.meta.env.VITE_HOST}/auth/google`,
        { result }
      )
      console.log('response: ', response)
      if (response.status === 200) {
        response = response.data
        window.localStorage.setItem('name', response.name)
        window.localStorage.setItem('email', response.email)
        window.localStorage.setItem('photoUrl', response.picture)
        window.localStorage.setItem('token', response.token)
        window.localStorage.setItem('user_id', response.user_id)
        console.log("RSPONSE --------------FIREBASE IS ON", response.user_id);
        
        // Redirect to profile page
        navigate('/home')

        
        
      } else {
        console.error('Authentication failed')
      }
    } catch (error) {
      console.error('Google Sign-In Error:', error)
    }
  }

  return (
    <div
  className="flex items-center rounded-md justify-center bg-tertiary cursor-pointer mb-4 hover:bg-white hover:text-primary"
  onClick={googleLogin}
>
  <img className="h-6 w-6" src="./google.png" alt="Google" />
  <span className=" p-2 text-lg hover:text-primary">Continue with Google</span>
</div>

  )
}

export default GoogleSignIn
