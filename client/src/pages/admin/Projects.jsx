import { Link } from "react-router-dom";
import { RiDeleteBin6Line, RiEyeLine } from "react-icons/ri";
import { useState } from "react";
import Swal from "sweetalert2";
import moment from "moment";
import { projects } from "../../utils/dummyData";

const Projects = () => {
  const [search, setSearch] = useState("");

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
  return (
    <div className="p-5">
      <div className="text-center my-10 text-4xl font-semibold uppercase text-gray-700">
        All Projects
      </div>
      <div className="flex items-center justify-between">
        <div className="text-lg">
          show{" "}
          <span className="font-bold text-blue-500">{projects?.length}</span>{" "}
          projects
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
                    <Link to={`/projects/${project?._id}`}>
                      <RiEyeLine className="text-blue-500" size={23} />
                    </Link>
                    <RiDeleteBin6Line
                      className="text-red-500 cursor-pointer"
                      size={23}
                      onClick={() => deleteHandler(project?._id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Projects;
