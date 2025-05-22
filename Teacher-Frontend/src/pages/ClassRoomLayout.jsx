import * as React from "react";
import Sidebar from "../components/builder-components/Sidebar";
// import Header from "./Header";
import ClassroomGrid from "../components/builder-components/ClassroomLayout/ClassRoomGrid";

function ClassroomLayout() {
	return (
		// <div className="flex flex-col w-full h-screen overflow-hidden bg-white">
		// 	{/* <Header /> */}
		// 	<div className="z-10 w-full h-full overflow-auto">
		// 		<div className="flex gap-4 max-md:flex-col h-full">
		// 			{/* <Sidebar /> */}
		// 			<ClassroomGrid />
		// 		</div>
		// 	</div>
		// </div>
		<div className="flex flex-col w-full">
			<div className="w-full">
				<div className="flex flex-col gap-5 max-md:gap-4">
					<ClassroomGrid />
				</div>
			</div>
		</div>
	);
}

export default ClassroomLayout;
