import Swal from "sweetalert2";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import useGetAllTeams from "../../hooks/team/useGetAllTeams";
import { useSelector } from "react-redux";
import Spinner from "../../components/Spinner";
import useDeleteTeam from "../../hooks/team/useDeleteTeam";

const Teams = () => {
  const [search, setSearch] = useState("");
  const { loading } = useGetAllTeams();
  const { teams } = useSelector((state) => state.team);
  const { deleteTeam } = useDeleteTeam();

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
      await deleteTeam(id);
    });
  };
  return (
    <div className="p-5">
      <div className="text-center my-10 text-4xl font-semibold uppercase text-gray-700">
        Teams
      </div>
      <div className="flex items-center justify-between">
        <div>
          <Link
            to={"createteam"}
            title="add new team"
            className="block bg-green-400 hover:bg-green-500 transition-all w-fit
          p-1 rounded-lg text-white cursor-pointer"
          >
            <FiPlus size={19} />
          </Link>
          <div className="text-lg">
            show{" "}
            <span className="font-bold text-blue-500">{teams?.length}</span>{" "}
            teams
          </div>
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
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex gap-2 flex-wrap justify-center mt-10">
          {teams?.map((team) => (
            <div
              key={team?._id}
              className=" w-[calc(100%/3.1)] h-80 rounded-xl shadow-lg relative"
            >
              <img
                src={team?.teamPic.url}
                alt="teampic"
                className="rounded-xl object-cover h-full w-full opacity-[0.5]"
              />
              <div className="absolute w-full h-full bg-green-400 top-0 rounded-xl opacity-[0.8]">
                <div>
                  <div className="text-white text-center text-2xl my-5 font-semibold border-b-2 pb-3">
                    {team?.teamName}
                  </div>
                  <div className="p-3">
                    <div className="text-white font-semibold my-3">
                      Team Leader :{" "}
                      <span className="text-blue-500 font-bold">
                        {team?.teamLeader.userName}
                      </span>
                    </div>
                    <div className="text-white font-semibold my-3">
                      Members:{" "}
                      <span className="text-blue-500 font-bold">
                        {team?.members.length}
                      </span>
                    </div>
                    <div className="text-white font-semibold my-3">
                      Projects :{" "}
                      <span className="text-blue-500 font-bold">
                        {team?.projects.length}
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className="absolute bottom-0 w-full bg-green-400 hover:bg-red-500 text-red-600 hover:text-white transition-all
              rounded-br-lg rounded-bl-lg p-3 cursor-pointer text-center font-bold text-lg"
                  onClick={() => deleteHandler(team?._id)}
                >
                  Delete Team
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Teams;
