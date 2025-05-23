import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from "react-router-dom";

import { useAuth } from "./components/Auth/AuthContext";
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

// function App() {
// 	const { auth } = useAuth();

// 	// Show loading or nothing until auth is known
// 	if (!auth) {
// 		return <div className="text-center mt-20 text-xl">Loading...</div>;
// 		// return <SignIn />
// 		return
// 	}

// 	const userType = auth.user_type;

// 	return (
// 		<Router>
// 			<Routes>
// 				{/* Public Routes */}
// 				<Route path="/" element={<SignIn />} />
// 				<Route path="/signin" element={<SignIn />} />
// 				<Route path="/signup" element={<SignUp />} />
// 				<Route path="/test-env" element={<TestEnv />} />

// 				{/* Protected Routes Based on Role */}
// 				{userType === "teacher" ? (
// 					<>
// 						<Route
// 							path="/home"
// 							element={
// 								<Layout>
// 									<Home />
// 								</Layout>
// 							}
// 						/>
// 						<Route
// 							path="/profile"
// 							element={
// 								<Layout>
// 									<Profile />
// 								</Layout>
// 							}
// 						/>
// 						<Route
// 							path="/past-projects"
// 							element={
// 								<Layout>
// 									<PastProjects />
// 								</Layout>
// 							}
// 						/>
// 						<Route
// 							path="/upload-file"
// 							element={
// 								<Layout>
// 									<UploadFile />
// 								</Layout>
// 							}
// 						/>
// 						<Route
// 							path="/section-details"
// 							element={
// 								<Layout>
// 									<SectionDetails />
// 								</Layout>
// 							}
// 						/>
// 						<Route
// 							path="/generate-sections"
// 							element={
// 								<Layout>
// 									<GenerateSections />
// 								</Layout>
// 							}
// 						/>
// 						<Route
// 							path="/classRoom"
// 							element={
// 								<Layout>
// 									<ClassroomLayout />
// 								</Layout>
// 							}
// 						/>
// 						<Route
// 							path="/students"
// 							element={
// 								<Layout>
// 									<StudentsPage />
// 								</Layout>
// 							}
// 						/>
// 						<Route
// 							path="/resource"
// 							element={
// 								<Layout>
// 									<Resources />
// 								</Layout>
// 							}
// 						/>
// 						<Route
// 							path="/assignment"
// 							element={
// 								<Layout>
// 									<Assignments />
// 								</Layout>
// 							}
// 						/>
// 						<Route
// 							path="/classes"
// 							element={
// 								<Layout>
// 									<Classes />
// 								</Layout>
// 							}
// 						/>
// 						<Route
// 							path="/classStudents/:classId"
// 							element={
// 								<Layout>
// 									<ClassStudents />
// 								</Layout>
// 							}
// 						/>
// 						<Route
// 							path="/doubts"
// 							element={
// 								<Layout>
// 									<Doubts />
// 								</Layout>
// 							}
// 						/>
// 					</>
// 				) : userType === "student" ? (
// 					<>
// 						<Route
// 							path="/home"
// 							element={
// 								<Layout>
// 									<Home />
// 								</Layout>
// 							}
// 						/>
// 						<Route
// 							path="/profile"
// 							element={
// 								<Layout>
// 									<Profile />
// 								</Layout>
// 							}
// 						/>
// 						<Route
// 							path="/resource"
// 							element={
// 								<Layout>
// 									<Resources />
// 								</Layout>
// 							}
// 						/>
// 						<Route
// 							path="/assignment"
// 							element={
// 								<Layout>
// 									<Assignments />
// 								</Layout>
// 							}
// 						/>
// 						{/* If you have a practice tests page */}
// 						<Route
// 							path="/practice-tests"
// 							element={
// 								<Layout>
// 									<TestEnv />
// 								</Layout>
// 							}
// 						/>
// 					</>
// 				) : null}

// 				{/* 404 for everything else */}
// 				<Route path="*" element={<NotFound />} />
// 			</Routes>
// 		</Router>
// 	);
// }

function App() {
	const { auth } = useAuth();

	return (
		<Router>
			<Routes>
				{/* Public Routes */}
				<Route path="/" element={<SignIn />} />
				<Route path="/signin" element={<SignIn />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/test-env" element={<TestEnv />} />

				{/* Loading fallback */}
				{auth === undefined && (<Route path="*" element=
						{<div className="text-center mt-20 text-xl">Loading...</div>}
					/>
				)}

				{/* Not Authenticated: redirect to signin */}
				{auth === false && (<Route path="*" element={<Navigate to="/signin" replace />} />)}

				{/* Authenticated User */}
				{auth && auth.user_type === "teacher" && (
					<>
						<Route path="/home" element={<Layout><Home /></Layout>}/>
						<Route path="/profile" element={ <Layout> <Profile /> </Layout> }/>
						<Route path="/upload-file" element={ <Layout> <UploadFile /> </Layout> } />
						<Route path="/past-projects" element={ <Layout> <PastProjects /> </Layout> } />
						<Route path="/generate-sections" element={ <Layout> <GenerateSections /> </Layout> } />
						<Route path="/section-details" element={ <Layout> <SectionDetails /> </Layout> } />
						<Route path="/classRoom" element={ <Layout> <ClassroomLayout /> </Layout> } />
						<Route path="/students" element={ <Layout> <StudentsPage /> </Layout> } />
						<Route path="/resource" element={ <Layout> <Resources /> </Layout> } />
						<Route path="/assignment" element={ <Layout> <Assignments /> </Layout> } />
						<Route path="/classes" element={ <Layout> <Classes /> </Layout> } />
						<Route path="/classStudents/:classId" element={ <Layout> <ClassStudents /> </Layout> } />
						<Route path="/doubts" element={ <Layout> <Doubts /> </Layout> } />
					</>
				)}

				{auth && auth.user_type === "student" && (
					<>
						<Route path="/resources" element={ <Layout> <Resources /> </Layout> } />
						<Route path="/assignments" element={ <Layout> <Assignments /> </Layout> } />
						<Route path="/home" element={ <Layout> <Home /> </Layout> } />
						{/* Add practice test routes or others here */}
					</>
				)}

				{/* 404 Fallback */}
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Router>
	);
}

export default App;
