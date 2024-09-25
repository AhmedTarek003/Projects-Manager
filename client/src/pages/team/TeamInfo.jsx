import { Link } from "react-router-dom";
import { team } from "../../utils/dummyData";
import { MdModeEdit } from "react-icons/md";

const TeamInfo = () => {
  return (
    <div>
      <div>
        <img src={team?.teamPic.url} alt="" className="w-full max-h-[300px]" />
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
        <Link to={`team/${team?._id}`}>
          <MdModeEdit
            size={24}
            className="bg-green-500 hover:bg-green-600 w-[35px] h-[35px] rounded-lg p-[6px] text-green-200 cursor-pointer"
          />
        </Link>
      </div>
    </div>
  );
};

export default TeamInfo;
