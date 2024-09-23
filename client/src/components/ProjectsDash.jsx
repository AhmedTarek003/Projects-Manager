import { projects } from "../utils/dummyData";
import moment from "moment";
import { LuEye } from "react-icons/lu";
import { Link } from "react-router-dom";

const ProjectsDash = () => {
  return (
    <>
      <div
        className="flex-[8] bg-white p-3 shadow-lg rounded-lg max-h-[800px] overflow-auto
      "
      >
        <div className="text-center">
          <div className="text-2xl font-semibold">Projects</div>
          <p className="text-gray-500">projects must be delivered</p>
        </div>
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
                <td>
                  <Link
                    to={`/projects/${project?._id}`}
                    className="p-2 border-b"
                  >
                    <LuEye className="m-auto text-blue-500" size={24} />
                  </Link>
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
    </>
  );
};

export default ProjectsDash;
