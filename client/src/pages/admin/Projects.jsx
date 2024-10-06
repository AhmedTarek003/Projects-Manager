import { Link } from "react-router-dom";
import { RiEyeLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import moment from "moment";
import { FiPlus } from "react-icons/fi";
import ProjectInfo from "../projects/ProjectInfo";
import useGetAllProjects from "../../hooks/project/useGetAllProjects";
import { useSelector } from "react-redux";
import useGetProject from "../../hooks/project/useGetProject";

const Projects = () => {
  const [search, setSearch] = useState("");
  const [openProject, setOpenProject] = useState(false);
  const [id, setId] = useState("");

  useGetAllProjects();
  const { projects } = useSelector((state) => state.project);

  useGetProject(id);
  const { project } = useSelector((state) => state.project);

  const openProjectHandler = (id) => {
    setOpenProject(true);
    setId(id);
  };

  useEffect(() => {
    if (openProject) {
      document.body.classList.add("open_window");
    } else {
      document.body.classList.remove("open_window");
    }
  }, [openProject]);
  return (
    <div className="p-5">
      <div className="text-center my-10 text-4xl font-semibold uppercase text-gray-700">
        All Projects
      </div>
      <div className="flex items-center justify-between">
        <div>
          <Link
            to={"addproject"}
            title="add new project"
            className="block bg-green-200 hover:bg-green-300 transition-all w-fit
          p-1 rounded-lg text-gray-700 cursor-pointer"
          >
            <FiPlus size={19} />
          </Link>
          <div className="text-lg">
            show{" "}
            <span className="font-bold text-blue-500">{projects?.length}</span>{" "}
            projects
          </div>
        </div>
        <div>
          sort :{" "}
          <select className="outline-none px-5 py-2">
            <option value="">previes date</option>
            <option value="">next date</option>
          </select>
        </div>
        <div className="w-[330px] ">
          <input
            type="search"
            placeholder="search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 p-3 w-full rounded-[7px] outline-none text-[15px] shadow-lg"
          />
        </div>
      </div>
      <div>
        <table className="table-auto mt-10 w-full">
          <thead className="bg-gray-600 text-white">
            <tr>
              <th className="p-2 border-b">#</th>
              <th className="p-2 border-b">Project</th>
              <th className="p-2 border-b">Team</th>
              <th className="p-2 border-b">Due Date</th>
              <th className="p-2 border-b">Statues</th>
              <th className="p-2 border-b">Completed Percent</th>
              <th className="p-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {projects?.map((project, idx) => (
              <tr key={project?._id}>
                <td className="p-2 border bg-white">{idx + 1}</td>
                <td className="bg-white border p-2">{project?.projectName}</td>
                <td className="p-2 border bg-white">
                  {project?.team.teamName}
                </td>
                <td className="p-2 border bg-white">
                  {moment(project?.dueDate).format("YYYY/MM/DD")}
                </td>
                <td className="p-2 border bg-white">
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
                <td className="p-2 border bg-white">
                  {project?.completePercent}%
                </td>
                <td className="p-2 border bg-white">
                  <div className="flex justify-center items-center gap-5">
                    <RiEyeLine
                      className="text-blue-500 cursor-pointer"
                      size={23}
                      onClick={() => openProjectHandler(project?._id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {openProject && (
        <ProjectInfo
          setOpenProject={setOpenProject}
          project={project && project}
        />
      )}
    </div>
  );
};

export default Projects;
