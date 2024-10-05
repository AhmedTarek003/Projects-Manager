import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import Header from "../../components/Header";
import { FiUsers } from "react-icons/fi";
import { GrProjects, GrUserAdmin } from "react-icons/gr";
import { MdGroups, MdOutlineCalendarMonth } from "react-icons/md";
import DashboardContent from "../../components/DashboardContent";
import { useEffect } from "react";

const Dashboard = () => {
  const location = useLocation();
  useEffect(() => {
    localStorage.setItem("alp", location.pathname);
  }, [location]);
  return (
    <div className="flex gap-2">
      <div className="flex-1 bg-white h-svh shadow-lg">
        <div className="font-mono text-4xl font-semibold text-center mt-2 text-gray-700 border-b-2 pb-2">
          Company
        </div>
        <div className="flex flex-col px-5 mt-10">
          <Link
            to={"/admin_dashboard"}
            className="text-2xl font-semibold text-gray-500"
          >
            Dashboard
          </Link>
          <NavLink
            to={"users"}
            className="text-xl font-semibold mt-3 p-[10px] flex items-center gap-3"
          >
            <FiUsers />
            Users
          </NavLink>
          <NavLink
            to={"admins"}
            className="text-xl font-semibold mt-3 p-[10px] flex items-center gap-3"
          >
            <GrUserAdmin />
            Admins
          </NavLink>
          <NavLink
            to={"teams"}
            className="text-xl font-semibold mt-3 p-[10px] flex items-center gap-3"
          >
            <MdGroups />
            Teams
          </NavLink>
          <NavLink
            to={"projects"}
            className="text-xl font-semibold mt-3 p-[10px] flex items-center gap-3"
          >
            <GrProjects />
            Projects
          </NavLink>
          <NavLink
            to={"calendar"}
            className="text-xl font-semibold mt-3 p-[10px] flex items-center gap-3"
          >
            <MdOutlineCalendarMonth />
            Calendar
          </NavLink>
        </div>
      </div>
      <div className="flex-[5] overflow-auto h-[100vh]">
        <Header />
        {location.pathname === "/admin_dashboard" && (
          <div>
            <DashboardContent />
          </div>
        )}
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
