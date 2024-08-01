import React, { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useTaskList } from "../State Management/ContextStore";
import { useScreenLoading } from "../State Management/Store";
import { db } from "../Database/Firebase"; // Import Firestore instance
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import EditTaskModal from "./EditTaskModal";
import Loader from "../Loader/Loader";

// Function to format date
const formatDate = (date) => {
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
};

// Function to group tasks by month and year
const groupByMonth = (tasks) => {
  return tasks.reduce((groups, task) => {
    const [year, month] = task.Date.split("-");
    const monthYear = `${new Date(year, month - 1).toLocaleString("default", {
      month: "long",
    })} ${year}`;

    if (!groups[monthYear]) {
      groups[monthYear] = [];
    }
    groups[monthYear].push(task);

    return groups;
  }, {});
};

const getDeadlineColorClass = (deadline) => {
  const currentDate = new Date();
  const deadlineDate = new Date(deadline);

  // Convert both dates to the Indian time zone
  const options = {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };
  const indiaCurrentDate = new Intl.DateTimeFormat("en-IN", options).format(
    currentDate
  );
  const indiaDeadlineDate = new Intl.DateTimeFormat("en-IN", options).format(
    deadlineDate
  );

  // Parse the dates for comparison
  const [currentDay, currentMonth, currentYear] = indiaCurrentDate
    .split("/")
    .map(Number);
  const [deadlineDay, deadlineMonth, deadlineYear] = indiaDeadlineDate
    .split("/")
    .map(Number);

  if (
    deadlineYear < currentYear ||
    (deadlineYear === currentYear && deadlineMonth < currentMonth) ||
    (deadlineYear === currentYear &&
      deadlineMonth === currentMonth &&
      deadlineDay < currentDay)
  ) {
    return "text-red-500"; // Past due date
  } else if (
    deadlineYear > currentYear ||
    (deadlineYear === currentYear && deadlineMonth > currentMonth) ||
    (deadlineYear === currentYear &&
      deadlineMonth === currentMonth &&
      deadlineDay > currentDay)
  ) {
    return "text-green-500"; // Future due date
  } else {
    return "text-yellow-500"; // Due today
  }
};

// Sort tasks by date
const sortTasksByDate = (tasks) => {
  return tasks.slice().sort((a, b) => new Date(a.date) - new Date(b.date));
};

const getPriorityColorClass = (priority) => {
  switch (priority) {
    case "High":
      return "text-red-500";
    case "Medium":
      return "text-yellow-500";
    case "Low":
      return "text-green-500";
    default:
      return "text-gray-500";
  }
};

const AllTask = () => {
  const { taskListData, setTaskListData } = useTaskList();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { screenLoading } = useScreenLoading();
  const [currentTask, setCurrentTask] = useState(null);

  const sortedTasks = sortTasksByDate(taskListData);
  const groupedTasks = groupByMonth(sortedTasks);

  const deleteTask = async (id) => {
    try {
      await deleteDoc(doc(db, "Task", id)); // Delete the document with the specified ID
      setTaskListData(taskListData.filter((task) => task.id !== id)); // Remove deleted task from the list
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const openEditModal = (task) => {
    setCurrentTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentTask(null);
  };

  const updateTask = async (updatedTask) => {
    try {
      const taskRef = doc(db, "Task", updatedTask.id);
      await updateDoc(taskRef, updatedTask); // Update the document in Firestore
      setTaskListData(
        taskListData.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      ); // Update the task in the local state
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <div>
      {screenLoading ? (
        <Loader />
      ) : (
        <>
          {Object.keys(groupedTasks).map((monthYear) => {
            const tasks = groupedTasks[monthYear];

            return (
              <div key={monthYear} className="px-10">
                <h2 className="text-2xl font-bold mb-4">{monthYear}</h2>
                {tasks.map((task) => {
                  const textDecoration =
                    task.Status === "Done" ? "line-through" : "none";
                  const priorityColorClass = getPriorityColorClass(
                    task.Priority
                  );
                  const deadlineColorClass = getDeadlineColorClass(
                    task.Deadline
                  );

                  return (
                    <div
                      key={task.id} // Use task ID for the key
                      className="p-4 mb-4 border border-gray-200 rounded flex flex-row flex-wrap justify-between items-center"
                    >
                      <div className="">
                        <h1
                          className={`text-xl font-bold ${textDecoration} w-60`}
                        >
                          {task.Title}
                        </h1>
                        <p className={`text-gray-700 ${textDecoration} w-48`}>
                          {task.Description}
                        </p>
                        <p className="text-gray-400">{formatDate(task.Date)}</p>
                      </div>

                      <div className="flex flex-col items-center justify-center">
                        <h2 className="font-bold">Priority</h2>
                        <p className={`font-bold ${priorityColorClass}`}>
                          {task.Priority}
                        </p>
                      </div>

                      <div className="flex items-center">
                        <div className="bg-gray-200 h-10 w-24 rounded-full flex items-center justify-center">
                          <p className="font-bold text-center">{task.Status}</p>
                        </div>
                      </div>

                      <div className="flex flex-col items-center">
                        <h2 className="font-bold">Deadline</h2>
                        <p className={`font-bold ${deadlineColorClass}`}>
                          {formatDate(task.Deadline)}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button onClick={() => openEditModal(task)}>
                          <FaEdit size={30} color="gray" />
                        </button>
                        <button onClick={() => deleteTask(task.id)}>
                          <MdDeleteForever size={40} color="red" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}

          {isModalOpen && (
            <EditTaskModal
              isOpen={isModalOpen}
              onRequestClose={handleCloseModal}
              task={currentTask}
              onSave={updateTask}
            />
          )}
        </>
      )}
    </div>
  );
};

export default AllTask;
