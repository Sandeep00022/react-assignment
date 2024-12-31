import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks, deleteTask } from "../redux/tasks/tasksSlice.js";
import TaskForm from "./TaskForm.jsx";

const TaskList = () => {
  const { tasks, loading, error } = useSelector((state) => state?.tasks);
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteTask(id)).unwrap();
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

    const handleEdit = (task) => {
    setTaskToEdit(task);
    setOpenModal(true);
  };

  if (loading) return <p>Loading tasks...</p>;

  if (error) {
    const errorMessage =
      typeof error === "string" ? error : error.message || "An error occurred";
    return <p className="text-red-500">Error: {errorMessage}</p>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold mb-4">Task List</h2>
      {tasks?.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
            <thead className="bg-gray-200 text-gray-600 uppercase text-sm">
              <tr>
                <th className="px-6 py-3 text-left">Title</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Priority</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr
                  key={task._id}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="px-6 py-4 text-left">{task.title}</td>
                  <td className="px-6 py-4 text-left">
                    {task.status ? (
                      <span className="text-green-600 font-semibold">Completed</span>
                    ) : (
                      <span className="text-red-600 font-semibold">Pending</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-left">{task.priority}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleEdit(task)}
                      className="text-blue-500 hover:underline mr-4"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600">No tasks available. Add a task to get started.</p>
      )}
    <TaskForm setOpenModal={setOpenModal} openModal={openModal} taskToEdit={taskToEdit} />
    </div>
  );
};

export default TaskList;
