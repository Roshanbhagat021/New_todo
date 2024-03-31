import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import axios from "axios";
import React from "react";

const TaskItem = ({
  id,
  due_date,
  status,
  description,
  title,
  isSomethingUpdated,
  setIsSomethingUpdated
}) => {
  async function deleteTask() {
    try {
      let res = await axios.delete(`http://localhost:3000/todos/${id}`);
    } catch (error) {
      console.log("error: ", error);
    }
  }

  function handleDelete() {
    deleteTask();
    setIsSomethingUpdated(prev=>!prev)
  }

  return (
    <>
      <div className="  w-[90vw] max-w-[1200px] shadow-xl mt-8 m-auto sm:w-[80vw] min-h-[120px] border-2 rounded-2xl flex justify-between flex-col py-2 px-5">
        <div className="flex justify-between">
          <h1>{title}</h1>
          <p>Due Date:{due_date}-April</p>
        </div>
        <div>{description}</div>

        <div className="flex justify-between">
          <div>
            <p>Staus-{status == "true" ? "Completed" : "Pending"} </p>
          </div>

          <div className="flex gap-2 text-2xl cursor-pointer">
            <div>
              <EditIcon />
            </div>

            <div onClick={handleDelete}>
              <DeleteIcon />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskItem;
