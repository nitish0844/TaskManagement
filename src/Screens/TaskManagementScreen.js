import React from "react";
import NavBar from "../Components/Navbar/NavBar";
import AllTask from "../Components/Task Management/AllTask";
import GetTaskData from "../Components/Task Management/GetTaskData";

const TaskManagementScreen = () => {
  return (
    <div>
      <NavBar />
      <AllTask />
      <GetTaskData />
    </div>
  );
};

export default TaskManagementScreen;
