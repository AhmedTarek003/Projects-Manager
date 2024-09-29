import { IoClose } from "react-icons/io5";
import { task } from "../../utils/dummyData";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";

// eslint-disable-next-line react/prop-types
const TaskInfo = ({ setOpenTask }) => {
  const user = "teamLeader";
  return (
    <div className="fixed w-full h-full bg-[#2e2e2ebb] top-0 left-0 flex justify-center items-center z-50">
      <div className="bg-white w-[60%] h-[80%] rounded-lg shadow-lg p-5 relative overflow-hidden ">
        <IoClose
          className="absolute right-[3%] top-[3%] cursor-pointer text-red-500 hover:text-red-700"
          size={40}
          onClick={() => {
            setOpenTask(false);
            // window.history.replaceState(null, "", originalPath);
          }}
        />
        <div className="text-center text-3xl font-semibold text-gray-600">
          Task Info
        </div>
        <div className="mt-5 flex justify-between items-center">
          <div>
            <div className="font-semibold my-1">
              Project Name :{" "}
              <span className="text-blue-500 capitalize text-lg">
                {task?.project.projectName}
              </span>
            </div>
            <div className="font-semibold my-1">
              Task :{" "}
              <span className="text-blue-500 capitalize text-lg">
                {task?.title}
              </span>
            </div>
            <div className="font-semibold my-1">
              description :{" "}
              <span className="text-blue-500 capitalize text-lg">
                {task?.desc}
              </span>
            </div>
            <div className="font-semibold my-1">
              completed :{" "}
              <span className="text-blue-500 capitalize text-lg">
                {task?.completed.toString()}
              </span>
            </div>
          </div>
          {user === "teamLeader" && (
            <div className="flex justify-center items-center gap-1">
              <Link to={`/teams/project/tasks/${task?._id}`}>
                <BiEdit className="text-green-500" size={23} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskInfo;
