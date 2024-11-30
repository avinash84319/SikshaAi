import * as React from "react";
import Sidebar from "../components/builder-components/Sidebar";
// import Header from "./Header";
import ClassroomGrid from "../components/builder-components/ClassroomLayout/ClassRoomGrid";
 
function ClassroomLayout() {
  return (
    <div className="flex overflow-hidden flex-col bg-white w-full">
      {/* <Header /> */}
      <div className="z-10 w-full">
        <div className="flex gap-5 max-md:flex-col">
          {/* <Sidebar /> */}
          <ClassroomGrid />
        </div>
      </div>
    </div>
  );
}
 
export default ClassroomLayout;