import React, { useState, useEffect } from "react";
import Modal from "react-modal";

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

const EditTaskModal = ({ isOpen, onRequestClose, task, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    deadline: "",
    priority: "High",
    status: "Pending", // Default status
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.Title,
        description: task.Description,
        date: task.Date,
        deadline: task.Deadline,
        priority: task.Priority,
        status: task.Status, // Initialize status from task
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...task,
      Title: formData.title,
      Description: formData.description,
      Date: formData.date,
      Deadline: formData.deadline,
      Priority: formData.priority,
      Status: formData.status, // Update status
    });
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Edit Task Modal"
    >
      <h2 className="text-2xl font-bold mb-4">Edit Task</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="block w-full p-2 border border-gray-300 rounded"
          />
        </label>
        <label className="block mb-2">
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="block w-full p-2 border border-gray-300 rounded"
          />
        </label>
        <label className="block mb-2">
          Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="block w-full p-2 border border-gray-300 rounded"
          />
        </label>
        <label className="block mb-2">
          Deadline:
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="block w-full p-2 border border-gray-300 rounded"
          />
        </label>
        <label className="block mb-2">
          Priority:
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
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
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="block w-full p-2 border border-gray-300 rounded"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </label>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onRequestClose}
            className="mr-4 px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditTaskModal;
