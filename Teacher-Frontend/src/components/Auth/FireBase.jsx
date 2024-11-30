// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: 'YOUR_API_KEY',
//   authDomain: 'YOUR_PROJECT_ID.firebaseapp.com',
//   projectId: 'YOUR_PROJECT_ID',
//   storageBucket: 'YOUR_PROJECT_ID.appspot.com',
//   messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
//   appId: 'YOUR_APP_ID',
// }

const firebaseConfig = {
  apiKey: 'AIzaSyDceVn4M2tUwu7TUANIvhKIZwJj5Am5W6M',
  authDomain: 'teacher-auth-b29a2.firebaseapp.com',
  projectId: 'teacher-auth-b29a2',
  storageBucket: 'teacher-auth-b29a2.appspot.com',
  messagingSenderId: '784610080782',
  appId: '1:784610080782:web:b97c411d7aa11b84ace45f',
  measurementId: 'G-VE4TW2NW5M',
}


// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

export const auth = getAuth(app)
export default app