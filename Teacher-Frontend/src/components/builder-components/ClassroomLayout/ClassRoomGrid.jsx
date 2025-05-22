// ClassroomGrid.jsx
import * as React from "react";
import ClassroomCard from "./ClassRoomCard";
import axios from "axios";

const VITEHOST = import.meta.env.VITE_HOST;
const user_id = localStorage.getItem("user_id");
console.log("USER-ID grid---------", user_id);

function ClassroomGrid() {
	const [classrooms, setClassrooms] = React.useState(null);

	async function fetch_classrooms() {
		// const response = await axios.get(VITEHOST +"/api/getTeachersClasses?user_id=" + user_id);
		const response = await axios.get(VITEHOST +"/api/getClasseswithtests");

		console.log("ClassROOM GRID:", response?.data);
		const data = response.data;
		const classes = [];
		data?.classes?.forEach((element) => {
			const classrooms1 = {
				name: element?.class[2],
				description: element?.class[3],
				tests: element?.tests,
				activeTest: 1,
				actions: ["ext_11-", "ext_12-"],
			};
			classes.push(classrooms1);
		});

		setClassrooms(classes);
	}
	React.useEffect(() => {
		fetch_classrooms();
	}, []);

	//   const classrooms = Array(12).fill({
	//     name: "Class Name",
	//     description: "Section/Description",
	//     tests: ["Test 1", "Test 2", "Test 3", "Test 4"],
	//     activeTest: 0,
	//     actions: ["ext_11-", "ext_12-", "ext_13-"]
	//   });

	return (
		// <main className="flex flex-col px-4 py-4 w-full h-full overflow-auto max-md:px-2">
		// 	<div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1">
		// 		{classrooms.map((classroom, index) => (
		// 			<ClassroomCard key={index} {...classroom} />
		// 		))}
		// 	</div>
		// </main>
		<main className="w-full">
			<div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1">
				{classrooms?.map((classroom, index) => (
					<ClassroomCard key={index} {...classroom} />
				))}
			</div>
		</main>
	);
}

export default ClassroomGrid;
