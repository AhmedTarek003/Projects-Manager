import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/admin/Dashboard";
import AllUsers from "./pages/admin/user/AllUsers";
import Admins from "./pages/admin/user/Admins";
import Teams from "./pages/admin/Teams";
import Projects from "./pages/admin/Projects";
import Calendar from "./pages/admin/Calendar";
import AddUser from "./pages/creation/AddUser";
import AddProject from "./pages/creation/AddProject";
import TeamDash from "./pages/team/TeamDash";
import TeamInfo from "./pages/team/TeamInfo";
import Members from "./pages/team/Members";
import TeamProjects from "./pages/team/TeamProjects";
import Chat from "./pages/team/Chat";
import CreateTeam from "./pages/creation/CreateTeam";
import EditProject from "./pages/projects/EditProject";
import AddTask from "./pages/creation/AddTask";
import EditTask from "./pages/task/EditTask";
import EditTeamInfo from "./pages/team/EditTeamInfo";

function App() {
  // const user = "admin";
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin_dashboard" element={<Dashboard />}>
          <Route path="users" element={<AllUsers />} />
          <Route path="users/adduser" element={<AddUser />} />
          <Route path="admins" element={<Admins />} />
          <Route path="teams" element={<Teams />} />
          <Route path="teams/createteam" element={<CreateTeam />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/addproject" element={<AddProject />} />
          <Route path="projects/:id" element={<EditProject />} />
          <Route path="calendar" element={<Calendar />} />
        </Route>
        <Route path="/teams" element={<TeamDash />}>
          <Route path="teaminfo/:id" element={<TeamInfo />} />
          <Route path="editteaminfo/:id" element={<EditTeamInfo />} />
          <Route path="members" element={<Members />} />
          <Route path="projects" element={<TeamProjects />} />
          <Route path="projects/:id" element={<EditProject />} />
          <Route path="chat" element={<Chat />} />
          <Route path=":projectid/addtask" element={<AddTask />} />
          <Route path="project/tasks/:id" element={<EditTask />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
