import React, { useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { Button } from "flowbite-react";

const Dashboard = () => {

    const [openModal, setOpenModal] = useState(false);

  return (
    <div className="justify-center items-center border border-gray-600  p-2">
     <Button  className="rounded m-4 text-black" onClick={() => setOpenModal(true)}>Add New Task</Button>
      <TaskForm openModal={openModal} setOpenModal={setOpenModal} />
      <TaskList />
    </div>
  );
};

export default Dashboard;
