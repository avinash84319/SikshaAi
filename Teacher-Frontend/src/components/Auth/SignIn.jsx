import { useRef, useState, useEffect, useContext } from 'react'
import GoogleSignIn from './GoogleSignIn'
import AuthContext from './AuthContext'
import axios from 'axios'

const LOGIN_URL = '/auth'

export default function SignIn() {
  const { setAuth } = useContext(AuthContext)
  const userRef = useRef()
  const errRef = useRef()

  const [user, setUser] = useState('')
  const [pwd, setPwd] = useState('')
  const [errmsg, setErrmsg] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    userRef.current.focus()
  }, [])
  useEffect(() => {
    setErrmsg('')
  }, [user, pwd])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      )
      console.log(JSON.stringify(response?.data))
      const accessToken = response?.data.accessToken
      // const roles = response?.data.roles
      setAuth({ user, pwd, accessToken })
      setUser('')
      setPwd('')
      setSuccess(true)
    } catch (err) {
      if (!err?.response) {
        setErrmsg('No Server response')
      } else if (err.response?.status === 400) {
        setErrmsg('Missing Username or Password')
      } else if (err.response?.status === 401) {
        setErrmsg('Unauthorized')
      } else {
        setErrmsg('Login Failed')
      }
      errRef.current.focus()
    }
  }

  return (
    <div className='flex justify-center items-center min-h-screen -mt-16'>
      {/* {success ? (
        <section className="flex flex-col justify-center items-center min-h-screen py-4">
          <h1 className="text-2xl">You are Logged In!</h1>
          <br />
          <p>
            <a href="/" className="text-white underline">
              Go to Homepage
            </a>
          </p>
        </section>
      ) : ( */}
        <section className="w-full max-w-md min-h-[550px] flex flex-col justify-center p-8 bg-primary rounded-lg text-white">
          <p
            ref={errRef}
            className={`${
              errmsg ? 'bg-red-100 text-red-800 font-bold p-2 mb-2' : 'hidden'
            }`}
            aria-live="assertive"
          >
            {errmsg}
          </p>
          <h1 className="flex justify-center text-4xl my-3">Sign In</h1>
          <form
            className="flex flex-col justify-evenly flex-grow pb-4"
            onSubmit={handleSubmit}
          >
            <label htmlFor="username" className="mt-4 text-lg">
              Username
            </label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
              className="font-nunito text-base p-1 rounded-md bg-white text-black"
            />
            <label htmlFor="password" className="mt-4 text-lg">
              Password
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              className="font-nunito text-base p-1 rounded-md bg-white text-black"
            />
            <button className="mt-8 text-lg p-2 rounded-md bg-tertiary text-white hover:bg-white hover:text-primary">
              Sign In
            </button>
          </form>
          {/* <p>
            Need an Account?
            <br />
            <span>
              <a href="/signup" className="text-white underline">
                Sign Up
              </a>
            </span>
          </p> */}
          <GoogleSignIn />
        </section>
      
    </div>
  )
}
