import { projects } from "../utils/dummyData";
import moment from "moment";
import { useEffect, useState } from "react";
import { LuEye } from "react-icons/lu";
import { Link } from "react-router-dom";
import ProjectInfo from "../pages/projects/ProjectInfo";

const ProjectsDash = () => {
  const [openProject, setOpenProject] = useState(false);

  useEffect(() => {
    if (openProject) {
      document.body.classList.add("open_window");
    } else {
      document.body.classList.remove("open_window");
    }
  }, [openProject]);

  return (
    <>
      <div className="flex-[8] bg-white p-3 shadow-lg rounded-lg h-fit relative">
        <div className="text-center">
          <div className="text-2xl font-semibold">Projects</div>
          <p className="text-gray-500">projects must be delivered</p>
        </div>
        <div className="max-h-[800px] overflow-auto mt-5">
          <table className="table-auto mt-3 w-full">
            <thead>
              <tr>
                <th className="p-2 border-b">Project</th>
                <th className="p-2 border-b">Team</th>
                <th className="p-2 border-b">Due Date</th>
                <th className="p-2 border-b">Status</th>
                <th className="p-2 border-b">Completed Percent</th>
                <th className="p-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {projects?.map((project) => (
                <tr key={project?._id} className="bg-gray-100">
                  <td className="p-2 border-b">{project?.projectName}</td>
                  <td className="p-2 border-b">{project?.team.teamName}</td>
                  <td className="p-2 border-b">
                    {moment(project?.dueDate).format("YYYY/MM/DD")}
                  </td>
                  <td className="p-2 border-b">
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
                  <td className="p-2 border-b">{project?.completePercent}%</td>
                  <td className="p-2 border-b">
                    <LuEye
                      className="m-auto text-blue-500 cursor-pointer"
                      size={24}
                      onClick={() => setOpenProject(true)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link
            to={"projects"}
            className="text-blue-600 hover:text-blue-800 font-semibold text-lg block w-fit mt-5 mb-2 "
          >
            see all projects
          </Link>
        </div>
        {openProject && <ProjectInfo setOpenProject={setOpenProject} />}
      </div>
    </>
  );
};

export default ProjectsDash;
