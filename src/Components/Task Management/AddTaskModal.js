// components/AddTaskModal.js
import React, { useState } from "react";
import Modal from "react-modal";
import { db } from "../Database/Firebase"; // Import Firestore instance
import { collection, addDoc } from "firebase/firestore";
import { useTaskLoadingStore } from "./../State Management/Store";

// Define custom styles for the modal
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    width: "40%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    padding: "20px",
    borderRadius: "10px",
  },
};

// Make sure to set app element for accessibility
Modal.setAppElement("#root");

const AddTaskModal = ({ isOpen, onRequestClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dateOfCreation, setDateOfCreation] = useState("");
  const [dateOfDeadline, setDateOfDeadline] = useState("");
  const [priority, setPriority] = useState("High");
  const [status, setStatus] = useState("Pending");

  const { setTaskLoading } = useTaskLoadingStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "Task"), {
        Title: title,
        Description: description,
        Date: dateOfCreation,
        Deadline: dateOfDeadline,
        Priority: priority,
        Status: status, // Set default status
      });
      setTaskLoading(true);
      // Clear form fields
      setTitle("");
      setDescription("");
      setDateOfCreation("");
      setDateOfDeadline("");
      setPriority("High");
      setStatus("Pending");
      // Close the modal
      onRequestClose();
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  console.log(dateOfCreation, dateOfDeadline);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Add Task Modal"
    >
      <h2 className="text-2xl font-bold mb-4">Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded"
          />
        </label>
        <label className="block mb-2">
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded"
          />
        </label>
        <label className="block mb-2">
          Date of Task Creation:
          <input
            type="date"
            value={dateOfCreation}
            onChange={(e) => setDateOfCreation(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded"
          />
        </label>
        <label className="block mb-2">
          Date of Deadline:
          <input
            type="date"
            value={dateOfDeadline}
            onChange={(e) => setDateOfDeadline(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded"
          />
        </label>
        <label className="block mb-4">
          Priority:
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded"
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </label>
        <label className="block mb-4">
          Status:
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded"
          >
            <option value="High">Pending</option>
            <option value="Medium">Progress</option>
            <option value="Low">Done</option>
          </select>
        </label>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add Task
        </button>
      </form>
    </Modal>
  );
};

export default AddTaskModal;
