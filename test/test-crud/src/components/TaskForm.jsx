import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createTask, updateTask } from "../redux/tasks/tasksSlice.js";
import { Button, Modal } from "flowbite-react";

const TaskForm = ({ setOpenModal, openModal, taskToEdit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  // If taskToEdit is passed (for editing), set initial values to pre-populate
  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
    }
  }, [taskToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    try {
      // If taskToEdit exists, update the task; else create a new one
      if (taskToEdit) {
        await dispatch(updateTask({ taskId: taskToEdit._id, updatedData: { title, description } })).unwrap();
      } else {
        await dispatch(createTask({ title, description })).unwrap();
      }

      // Clear form and close modal after successful submission
      setTitle("");
      setDescription("");
      setOpenModal(false);
    } catch (error) {
      console.error("Failed to save task:", error);
    }
  };

  return (
     <Modal
     size="md"
      className="flex flex-col p-5"
      show={openModal}
      onClose={() => setOpenModal(false)}
    >
      <Modal.Header className="pl-10">
        {taskToEdit ? "Edit Task" : "Create New Task"}
      </Modal.Header>
      <Modal.Body>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 shadow-md rounded-md"
        >
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-medium">
              Task Title
            </label>
            <input
              type="text"
              id="title"
              className="w-full mt-2 px-4 py-2 border rounded-md"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 font-medium"
            >
              Description
            </label>
            <textarea
              id="description"
              className="w-full mt-2 px-4 py-2 border rounded-md"
              placeholder="Enter task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            {taskToEdit ? "Update Task" : "Add Task"}
          </button>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button color="gray" onClick={() => setOpenModal(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TaskForm;
