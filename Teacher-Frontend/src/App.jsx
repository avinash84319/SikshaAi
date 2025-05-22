// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   Navigate,
// } from 'react-router-dom'

// import SignIn from './components/Auth/SignIn'
// import SignUp from './components/Auth/Signup'
// import Profile from './components/Auth/Profile'
// import UploadFile from './pages/UploadFile'
// import PastProjects from './pages/PastProjects'
// import GenerateSections from './pages/GenerateSections'
// import SectionDetails from './pages/SectionDetails'
// import TestEnv from './pages/TestEnv'
// import Home from './pages/Home'

// import Navbar from './components/builder-components/Navbar'
// import Sidebar from './components/builder-components/Sidebar'
// import ClassroomLayout from './pages/ClassRoomLayout'
// import StudentsPage from './pages/StudentsPage'
// import Resources from './pages/Resources'
// import Assignments from './pages/Assignments'
// import Classes from './pages/Classes'
// import ClassStudents from './pages/ClassStudents'

// import { useContext } from "react";
// import AuthContext from "./components/Auth/AuthContext";

// function Layout({ children }) {
//   return (
//     <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
//       {/* Navbar at the top, spans 100% width */}
//       <Navbar />
//       {/* Sidebar and Main Content */}
//       <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
//         <Sidebar style={{ width: '20%', height: '100%' }} />
//         <div className="flex-1 overflow-auto px-4 py-2 bg-gray-50">
//           {children}
//         </div>
//       </div>
//     </div>
//   )
// }


// function App() {
// 	const { auth } = useContext(AuthContext);

// 	return (
// 		<Router>
// 			<Routes>
// 				{/* Public Routes */}
// 				<Route path="/" element={<SignIn />} />
// 				<Route path="/signin" element={<SignIn />} />
// 				<Route path="/signup" element={<SignUp />} />
// 				<Route path="/test-env" element={<TestEnv />} />

// 				{/* Protected Routes */}
// 				<Route
// 					path="/*"
// 					element={
// 						auth ? (
// 							<Layout>
// 								<Routes>
// 									<Route path="/home" element={<Home />} />
// 									<Route
// 										path="/profile"
// 										element={<Profile />}
// 									/>
// 									<Route
// 										path="/past-projects"
// 										element={<PastProjects />}
// 									/>
// 									<Route
// 										path="/upload-file"
// 										element={<UploadFile />}
// 									/>
// 									<Route
// 										path="/section-details"
// 										element={<SectionDetails />}
// 									/>
// 									<Route
// 										path="/generate-sections"
// 										element={<GenerateSections />}
// 									/>
// 									<Route
// 										path="/classRoom"
// 										element={<ClassroomLayout />}
// 									/>
// 									<Route
// 										path="/students"
// 										element={<StudentsPage />}
// 									/>
// 									<Route
// 										path="/resource"
// 										element={<Resources />}
// 									/>
// 									<Route
// 										path="/assignment"
// 										element={<Assignments />}
// 									/>
// 									<Route
// 										path="/classes"
// 										element={<Classes />}
// 									/>
// 									<Route
// 										path="/classStudents/:classId"
// 										element={<ClassStudents />}
// 									/>
// 								</Routes>
// 							</Layout>
// 						) : (
// 							<Navigate to="/signin" />
// 						)
// 					}
// 				/>

// 				{/* Fallback Not Found Route - No Layout */}
// 				<Route
// 					path="*"
// 					element={
// 						<h1 className="text-center mt-10 text-2xl">
// 							404 - Page Not Found
// 						</h1>
// 					}
// 				/>
// 			</Routes>
// 		</Router>
// 	);
// }
// export default App
import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from "react-router-dom";

import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/Signup";
import Profile from "./components/Auth/Profile";
import UploadFile from "./pages/UploadFile";
import PastProjects from "./pages/PastProjects";
import GenerateSections from "./pages/GenerateSections";
import SectionDetails from "./pages/SectionDetails";
import TestEnv from "./pages/TestEnv";
import Home from "./pages/Home";

import Navbar from "./components/builder-components/Navbar";
import Sidebar from "./components/builder-components/Sidebar";
import ClassroomLayout from "./pages/ClassRoomLayout";
import StudentsPage from "./pages/StudentsPage";
import Resources from "./pages/Resources";
import Assignments from "./pages/Assignments";
import Classes from "./pages/Classes";
import ClassStudents from "./pages/ClassStudents";
import Doubts from "./pages/Doubts";

// Optional 404 Page Component
function NotFound() {
	return (
		<div className="flex justify-center items-center min-h-screen text-3xl">
			404 - Page Not Found
		</div>
	);
}

function Layout({ children }) {
	return (
		<div
			style={{
				height: "100vh",
				display: "flex",
				flexDirection: "column",
			}}
		>
			<Navbar />
			<div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
				<Sidebar style={{ width: "20%", height: "100%" }} />
				<div className="flex-1 overflow-auto px-4 py-2 bg-gray-50">
					{children}
				</div>
			</div>
		</div>
	);
}

function App() {
	return (
		<Router>
			<Routes>
				{/* Public Routes */}
				<Route path="/" element={<SignIn />} />
				<Route path="/signin" element={<SignIn />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/test-env" element={<TestEnv />} />

				{/* Protected Routes */}
				<Route
					path="/home"
					element={
						<Layout>
							<Home />
						</Layout>
					}
				/>
				<Route
					path="/profile"
					element={
						<Layout>
							<Profile />
						</Layout>
					}
				/>
				<Route
					path="/past-projects"
					element={
						<Layout>
							<PastProjects />
						</Layout>
					}
				/>
				<Route
					path="/upload-file"
					element={
						<Layout>
							<UploadFile />
						</Layout>
					}
				/>
				<Route
					path="/section-details"
					element={
						<Layout>
							<SectionDetails />
						</Layout>
					}
				/>
				<Route
					path="/generate-sections"
					element={
						<Layout>
							<GenerateSections />
						</Layout>
					}
				/>
				<Route
					path="/classRoom"
					element={
						<Layout>
							<ClassroomLayout />
						</Layout>
					}
				/>
				<Route
					path="/students"
					element={
						<Layout>
							<StudentsPage />
						</Layout>
					}
				/>
				<Route
					path="/resource"
					element={
						<Layout>
							<Resources />
						</Layout>
					}
				/>
				<Route
					path="/assignment"
					element={
						<Layout>
							<Assignments />
						</Layout>
					}
				/>
				<Route
					path="/classes"
					element={
						<Layout>
							<Classes />
						</Layout>
					}
				/>
				<Route
					path="/classStudents/:classId"
					element={
						<Layout>
							<ClassStudents />
						</Layout>
					}
				/>
				<Route
					path="/doubts"
					element={
						<Layout>
							<Doubts />
						</Layout>
					}
				/>

				{/* 404 Route - No Layout */}
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Router>
	);
}

export default App;
