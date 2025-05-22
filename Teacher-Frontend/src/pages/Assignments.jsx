import * as React from "react";
import { useState } from "react";
import axios from "axios";

import { AssignmentForm } from "../components/builder-components/Assignment/AssignmentForm";
import { StudentClassList } from "../components/builder-components/Assignment/StudentClassList";

const VITEHOST = import.meta.env.VITE_HOST;
const teacherId = localStorage.getItem("user_id");


const main = {
	display: "flex",
	flexDirection: "column",
	margin: "4.25rem",
	width: "75%",
	// overflowY: "auto",
};

export default function AssignmentLayout() {
	// const [teacherId, setTeacherId] = useState("12345678");
	const [classes, setClasses] = useState([]);
	const [students, setStudents] = useState([]);
	const [selectedClasses, setSelectedClasses] = useState([]);
	const [selectedStudents, setSelectedStudents] = useState([]);

	const fetchData = async () => {
		try {
			// Fetch classes
			const classResponse = await axios.get(`${VITEHOST}/api/getTeachersClasses?user_id=${teacherId}`,
				{
					headers: {
						"ngrok-skip-browser-warning": "69420",
					},
				}
			);

			const formattedClasses = classResponse.data.classes.map((cls) => ({
				id: cls[0], // Class ID
				teacherId: cls[1], // Teacher ID
				name: cls[2], // Class Name
				description: cls[3], // Class Description
			}));
			setClasses(formattedClasses);

			// Fetch students
			const studentResponse = await axios.get(
				`${ import.meta.env.VITE_HOST}/api/getAllStudents?user_id=${teacherId}`,
				{
					headers: {
						"ngrok-skip-browser-warning": "69420",
					},
				}
			);

			const formattedStudents = studentResponse.data.students.map(
				(std) => ({
					id: std[0], // Student ID
					name: std[1], // Student Name
					classId: std[2], // Class ID
				})
			);
			setStudents(formattedStudents);
		} catch (error) {
			console.error("Error fetching classes or students", error);
		}
	};
	React.useEffect(() => {
		fetchData();
	}, []);

	return (
		<main className="assignment-main" style={main}>
			{/* <button onClick={() => fetchData()}>Get Data</button> */}

			<AssignmentForm
				selectedClasses={selectedClasses}
				selectedStudents={selectedStudents}
				teacherId={teacherId}
			/>
			<StudentClassList
				classes={classes}
				students={students}
				selectedClasses={selectedClasses}
				setSelectedClasses={setSelectedClasses}
				selectedStudents={selectedStudents}
				setSelectedStudents={setSelectedStudents}
			/>
		</main>
	);
}
