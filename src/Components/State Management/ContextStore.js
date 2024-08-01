import React, { createContext, useState, useContext } from "react";

const DeviceListContext = createContext();

export const TaskListProvider = ({ children }) => {
  const [taskListData, setTaskListData] = useState([]);

  return (
    <DeviceListContext.Provider value={{ taskListData, setTaskListData }}>
      {children}
    </DeviceListContext.Provider>
  );
};

export const useTaskList = () => {
  return useContext(DeviceListContext);
};
