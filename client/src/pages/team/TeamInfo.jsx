import { Link } from "react-router-dom";
import { MdModeEdit } from "react-icons/md";
import { useState } from "react";
import useGetTeam from "../../hooks/team/useGetTeam";
import { useSelector } from "react-redux";
import useUpdateTeamImage from "../../hooks/team/useUpdateTeamImage";
import Spinner from "../../components/Spinner";

const TeamInfo = () => {
  const [file, setFile] = useState(null);
  useGetTeam();
  const { team } = useSelector((state) => state.team);
  const { updateTeamImg, loading } = useUpdateTeamImage();
  const uploadHandler = async () => {
    await updateTeamImg(team?._id, file);
    setFile(null);
  };
  return (
    <div>
      <div className="relative">
        <img
          src={file ? URL.createObjectURL(file) : team?.teamPic.url}
          alt=""
          className="w-full max-h-[300px]"
        />
        <label htmlFor="teamPic" className="absolute bottom-5 right-10">
          <MdModeEdit
            className="bg-gray-500 w-8 h-8 p-1 rounded-lg cursor-pointer opacity-[0.5] hover:opacity-[1]"
            size={23}
          />
          {file && (
            <button
              className="bg-blue-100 hover:bg-blue-200 cursor-pointer py-1 px-2 mt-2 rounded-lg text-gray-800 font-bold"
              onClick={uploadHandler}
            >
              upload
            </button>
          )}
        </label>
        <input
          type="file"
          id="teamPic"
          hidden
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>
      <div className="flex justify-between p-5">
        <div>
          <div className="text-3xl capitalize ml-5 mt-5 font-semibold">
            {team?.teamName}
          </div>
          <div>
            <div className="mt-8 text-lg">
              Team Leader :{" "}
              <span className="text-blue-500 capitalize font-semibold">
                {team?.teamLeader.userName}
              </span>
            </div>
            <div className="mt-8 text-lg">
              Members :{" "}
              <span className="text-blue-500 font-semibold">
                {team?.members.length}
              </span>
            </div>
            <div className="mt-8 text-lg">
              Projects :{" "}
              <span className="text-blue-500 font-semibold">
                {team?.projects.length}
              </span>
            </div>
          </div>
        </div>
        <Link to={`/teams/editteaminfo/${team?._id}`}>
          <MdModeEdit
            size={24}
            className="bg-green-500 hover:bg-green-600 w-[35px] h-[35px] rounded-lg p-[6px] text-green-200 cursor-pointer"
          />
        </Link>
      </div>
      {loading && <Spinner />}
    </div>
  );
};

export default TeamInfo;
