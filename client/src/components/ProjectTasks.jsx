import { useState } from "react";
import { RiDeleteBin6Line, RiEyeLine } from "react-icons/ri";
import Swal from "sweetalert2";
import TaskInfo from "../pages/task/TaskInfo";

const ProjectTasks = ({ tasks, user }) => {
  const [checkTask, setCheckTask] = useState(tasks);
  const [openTask, setOpenTask] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const deleteHandler = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("deleted");
      }
    });
  };

  const handleTaskCompletionChange = (_id) => {
    setCheckTask((prevTasks) =>
      prevTasks.map((task) =>
        task._id === _id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="mt-5">
      <div className="overflow-auto h-[280px]">
        {checkTask?.map((task) => (
          <div
            key={task?._id}
            className="flex items-center justify-between bg-gray-200 mt-3 p-3 select-none"
          >
            <div className="flex items-center gap-1">
              {" "}
              <input
                type="checkbox"
                id={`task-${task._id}`}
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 rounded border-gray-300"
                checked={task.completed}
                onChange={() => handleTaskCompletionChange(task._id)}
              />
              <label
                htmlFor={`task-${task._id}`}
                className={
                  task.completed
                    ? "line-through text-gray-400"
                    : "text-gray-700"
                }
              >
                {task.title}
              </label>
            </div>
            {user !== "admin" && (
              <div className="flex justify-center items-center gap-1">
                <RiEyeLine
                  className="text-blue-500 cursor-pointer"
                  size={23}
                  onClick={() => setOpenTask(true)}
                />
                <RiDeleteBin6Line
                  className="text-red-500 cursor-pointer"
                  size={23}
                  onClick={() => deleteHandler(task?._id)}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      {openTask && <TaskInfo setOpenTask={setOpenTask} />}
    </div>
  );
};

export default ProjectTasks;
