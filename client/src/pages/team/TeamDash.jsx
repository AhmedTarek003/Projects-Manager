import { FiUsers } from "react-icons/fi";
import { GrProjects, GrCircleInformation } from "react-icons/gr";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import Header from "../../components/Header";
import { IoChatbubblesOutline } from "react-icons/io5";
import TeamDashContent from "../../components/TeamDashContent";
import { team } from "../../utils/dummyData";

const TeamDash = () => {
  const location = useLocation();
  return (
    <div className="flex gap-2">
      <div className="flex-1 bg-white h-svh shadow-lg">
        <div className="font-mono text-4xl font-semibold text-center mt-2 text-gray-700 border-b-2 pb-2">
          Company
        </div>
        <div className="mt-3 text-center">
          <img
            src={team?.teamPic.url}
            alt=""
            className="w-20 h-20 rounded-full object-cover mx-auto"
          />
          <div className="text-2xl font-semibold capitalize">
            {team?.teamName}
          </div>
        </div>
        <div className="flex flex-col px-5 mt-5 team">
          <Link to={"/teams"} className="text-2xl font-semibold text-gray-500">
            Dashboard
          </Link>
          <NavLink
            to={`teaminfo/123`}
            className="text-xl font-semibold mt-3 p-[10px] flex items-center gap-3"
          >
            <GrCircleInformation />
            Team Info
          </NavLink>
          <NavLink
            to={"members"}
            className="text-xl font-semibold mt-3 p-[10px] flex items-center gap-3"
          >
            <FiUsers />
            Members
          </NavLink>
          <NavLink
            to={"projects"}
            className="text-xl font-semibold mt-3 p-[10px] flex items-center gap-3"
          >
            <GrProjects />
            Projects
          </NavLink>
          <NavLink
            to={"chat"}
            className="text-xl font-semibold mt-3 p-[10px] flex items-center gap-3"
          >
            <IoChatbubblesOutline />
            chat
          </NavLink>
        </div>
      </div>
      <div className="flex-[5] overflow-auto h-[100vh]">
        <Header />
        {location.pathname === "/teams" && (
          <div>
            <TeamDashContent />
          </div>
        )}
        <Outlet />
      </div>
    </div>
  );
};

export default TeamDash;
