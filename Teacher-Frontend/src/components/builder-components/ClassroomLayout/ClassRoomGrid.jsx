ClassroomGrid.jsx
import * as React from "react";
import ClassroomCard from "./ClassRoomCard";
 
function ClassroomGrid() {
  const classrooms = Array(6).fill({
    name: "Class Name",
    description: "Section/Description",
    tests: ["Test 1", "Test 2", "Test 3", "Test 4"],
    activeTest: 0,
    actions: ["ext_11-", "ext_12-", "ext_13-"]
  });
 
  return (
    <main className="flex flex-col ml-10 max-md:ml-0 max-md:w-full">
      <div className="flex flex-col mt-5 w-full max-md:mt-10 max-md:max-w-full">
        <div className="grid grid-cols-3 gap-10 max-md:grid-cols-1">
          {classrooms.map((classroom, index) => (
            <ClassroomCard key={index} {...classroom} />
          ))}
        </div>
      </div>
    </main>
  )
}
 
export default ClassroomGrid;
 
