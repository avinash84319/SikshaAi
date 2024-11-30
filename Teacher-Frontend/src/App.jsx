import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from 'react-router-dom'

import SignIn from './components/Auth/SignIn'
import Profile from './components/Auth/Profile'
import UploadFile from './pages/UploadFile'
import PastProjects from './pages/PastProjects'
import GenerateSections from './pages/GenerateSections'
import SectionDetails from './pages/SectionDetails'
import TestEnv from './pages/TestEnv'

// import Navbar from './components/Navbar'

// // Authentication check function
// const isAuthenticated = () => {
//   // Check if the access token is present in local storage
//   return Boolean(window.localStorage.getItem('token'))
// }

// // PrivateRoute component to handle protected routes
// const PrivateRoute = ({ element: Component }) => {
//   return isAuthenticated() ? Component : <Navigate to="/" replace />
// }

// // Component to conditionally render the Navbar
// const ConditionalNavbar = ({ children }) => {
//   const location = useLocation()
//   const hideNavbarPaths = ['/', '/test-env'] // Paths where Navbar should be hidden

//   return (
//     <>
//       {!hideNavbarPaths.includes(location.pathname) && <Navbar />}
//       {children}
//     </>
//   )
// }

// function App() {
//   return (
//     <Router>
//       <ConditionalNavbar>
//         <Routes>
//           <Route path="/" element={<SignIn />} />
//           <Route
//             path="/profile"
//             element={<PrivateRoute element={<Profile />} />}
//           />
//           <Route
//             path="/upload-file"
//             element={<PrivateRoute element={<UploadFile />} />}
//           />
//           <Route
//             path="/past-projects"
//             element={<PrivateRoute element={<PastProjects />} />}
//           />
//           <Route
//             path="/generate-sections"
//             element={<PrivateRoute element={<GenerateSections />} />}
//           />
//           <Route
//             path="/section-details"
//             element={<PrivateRoute element={<SectionDetails />} />}
//           />
//           <Route path="/test-env" element={<TestEnv />} />
//           <Route path="*" element={<h1>Not Found</h1>} />
//         </Routes>
//       </ConditionalNavbar>
//     </Router>
//   )
// }

import Navbar from './components/builder-components/Navbar'
import Sidebar from './components/builder-components/Sidebar'
import ClassroomLayout from './pages/ClassRoomLayout'
import StudentsPage from './pages/StudentsPage'
import Resources from './pages/Resources'
import Assignments from './pages/Assignments'
import Classes from './pages/Classes'
import ClassStudents from './pages/ClassStudents'


function Layout({ children }) {
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navbar at the top, spans 100% width */}
      <Navbar />
      {/* Sidebar and Main Content */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar style={{ width: '20%', height: '100%' }} />
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '10px',
            background: 'black',  
            display: 'flex',
            // justifyContent: 'center',
            // alignItems: 'center',
            backgroundColor: '#f9f9f9',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Public route without Navbar and Sidebar */}
        <Route path="/" element={<SignIn />} />
        <Route path="/test-env" element={<TestEnv />} />

        {/* Protected routes with Navbar and Sidebar */}
        <Route
          path="*"
          element={
            <Layout>
              <Routes>
                <Route path="/profile" element={<Profile />} />
                <Route path="/past-projects" element={<PastProjects />} />
                <Route path="/upload-file" element={<UploadFile />} />
                <Route path="/section-details" element={<SectionDetails />} />
                <Route path="/classes" element={<Classes />} />
                <Route path="/classStudents/:classId" element={<ClassStudents />} />
                <Route
                  path="/generate-sections"
                  element={<GenerateSections />}
                />
                
                <Route path="/classRoom" element={<ClassroomLayout />} />
                <Route path="/students" element={<StudentsPage />} />

                <Route path="/resource" element={<Resources/>} />
                <Route path="/assignment" element={<Assignments />} />
                <Route path="*" element={<h1>Not Found</h1>} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </Router>
  )
}

export default App