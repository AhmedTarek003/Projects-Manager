import moment from "moment";
import { BsInfoCircleFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import ProjectInfo from "../pages/projects/ProjectInfo";
import useGetProject from "../hooks/project/useGetProject";
import { useSelector } from "react-redux";

const TeamDashContent = ({ projects }) => {
  const [openProject, setOpenProject] = useState(false);
  const [id, setId] = useState("");

  useEffect(() => {
    if (openProject) {
      document.body.classList.add("open_window");
    } else {
      document.body.classList.remove("open_window");
    }
  }, [openProject]);

  const fileterProjects = projects?.filter(
    (project) => project.status !== "completed" && project.status !== "canceled"
  );

  useGetProject(id);
  const { project } = useSelector((state) => state.project);

  const openProjectHandler = (id) => {
    setOpenProject(true);
    setId(id);
  };
  return (
    <div>
      <table className="table-auto mt-3 w-full">
        <thead>
          <tr className="bg-green-400 text-white">
            <th className="p-2 border-b">Project</th>
            <th className="p-2 border-b">Team</th>
            <th className="p-2 border-b">Due Date</th>
            <th className="p-2 border-b">Status</th>
            <th className="p-2 border-b">Completed Percent</th>
            <th className="p-2 border-b">tasks</th>
            <th className="p-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {fileterProjects?.map((project) => (
            <tr key={project?._id} className="bg-white">
              <td className="p-3 border-b">{project?.projectName}</td>
              <td className="p-3 border-b">{project?.team.teamName}</td>
              <td className="p-3 border-b">
                {moment(project?.dueDate).format("YYYY/MM/DD")}
              </td>
              <td className="p-3 border-b">
                <span
                  className={`block w-24 py-1 rounded-md text-white m-auto ${
                    (project?.status === "onHold" && "bg-orange-500") ||
                    (project?.status === "inProgress" && "bg-blue-400") ||
                    (project?.status === "completed" && "bg-green-400") ||
                    (project?.status === "canceled" && "bg-red-400")
                  }`}
                >
                  {project?.status}
                </span>
              </td>
              <td className="p-3 border-b">{project?.completePercent}%</td>
              <td className="p-3 border-b">5/10</td>
              <td className="p-3 border-b">
                <div>
                  <BsInfoCircleFill
                    className="m-auto text-blue-500 hover:text-blue-700 cursor-pointer"
                    size={24}
                    onClick={() => openProjectHandler(project?._id)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {openProject && project && (
        <ProjectInfo setOpenProject={setOpenProject} project={project} />
      )}
    </div>
  );
};

export default TeamDashContent;
