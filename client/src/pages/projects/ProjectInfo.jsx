import { IoClose } from "react-icons/io5";
import moment from "moment";
import { useEffect, useState } from "react";
import ProjectTasks from "../../components/ProjectTasks";
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
import { BiEdit } from "react-icons/bi";
import { useAuthContext } from "../../context/authContext";
import useDeleteProject from "../../hooks/project/useDeleteProject";
import useUpdateProject from "../../hooks/project/useUpdateProject";

const ProjectInfo = ({ setOpenProject, project }) => {
  const [projectInfo, setProjectInfo] = useState({
    status: project?.status,
  });
  const { updateProject } = useUpdateProject();
  useEffect(() => {
    if (project?.status !== projectInfo.status) {
      updateProject(project?._id, projectInfo);
      window.location.reload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectInfo.status]);

  const originalPath = window.location.pathname;
  const { authUser } = useAuthContext();

  const { deleteProject } = useDeleteProject();
  const deleteHandler = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async () => {
      await deleteProject(id);
      setOpenProject(false);
    });
  };

  return (
    <div className="fixed w-full h-full bg-[#2e2e2ebb] top-0 left-0 flex justify-center items-center z-50">
      <div className="bg-white w-[60%] h-[80%] rounded-lg shadow-lg p-5 relative overflow-hidden ">
        <IoClose
          className="absolute right-[3%] top-[3%] cursor-pointer text-red-500 hover:text-red-700"
          size={40}
          onClick={() => {
            setOpenProject(false);
            window.history.replaceState(null, "", originalPath);
          }}
        />
        <div className="text-center text-3xl font-semibold text-gray-600">
          Project Info
        </div>
        <div className="mt-5 flex justify-between items-center">
          <div>
            <div className="font-semibold my-1">
              Project Name :{" "}
              <span className="text-blue-500 capitalize text-lg">
                {project?.projectName}
              </span>
            </div>
            <div className="font-semibold my-1">
              Team :{" "}
              <span className="text-blue-500 capitalize text-lg">
                {project?.team.teamName}
              </span>
            </div>
            <div className="font-semibold my-1">
              Start Date :{" "}
              <span className="text-blue-500 capitalize text-lg">
                {moment(project?.startDate).format("yyyy-MM-DD")}
              </span>
            </div>
            <div className="font-semibold my-1">
              Due Date :{" "}
              <span className="text-red-500 capitalize text-lg">
                {moment(project?.dueDate).format("yyyy-MM-DD")}
              </span>
            </div>
            <div className="font-semibold my-1">
              Complete Percent :{" "}
              <span className="text-green-500 capitalize text-lg">
                {project?.completePercent}%
              </span>
            </div>
          </div>
          {authUser?.user?.role === "teamLeader" && (
            <div className="flex justify-center items-center gap-1">
              <Link to={`/teams/projects/${project?._id}`}>
                <BiEdit className="text-green-500" size={23} />
              </Link>
              <RiDeleteBin6Line
                className="text-red-500 cursor-pointer"
                size={23}
                onClick={() => deleteHandler(project?._id)}
              />
            </div>
          )}
        </div>
        <div className="font-semibold mt-5 text-center">
          Status :{" "}
          {authUser?.user?.role !== "teamLeader" ? (
            <span
              className={`${
                (project?.status === "onHold" && "text-orange-500") ||
                (project?.status === "inProgress" && "text-blue-400") ||
                (project?.status === "completed" && "text-green-400") ||
                (project?.status === "canceled" && "text-red-400")
              } capitalize text-lg`}
            >
              {project?.status}
            </span>
          ) : (
            <select
              value={projectInfo.status}
              onChange={(e) => setProjectInfo({ status: e.target.value })}
              className="bg-slate-200 py-2 px-5 outline-none"
            >
              <option value="onHold">On Hold</option>
              <option value="inProgress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="canceled">Canceled</option>
            </select>
          )}
        </div>
        {authUser?.user?.role === "teamLeader" && (
          <Link
            to={`/teams/${project?._id}/addtask`}
            title="add new task"
            className="block bg-blue-400 hover:bg-blue-500 transition-all w-fit
          p-1 rounded-lg text-white cursor-pointer"
          >
            <FiPlus size={19} />
          </Link>
        )}
        {project && (
          <ProjectTasks tasks={project?.tasks} user={authUser?.user?.role} />
        )}
      </div>
    </div>
  );
};

export default ProjectInfo;
