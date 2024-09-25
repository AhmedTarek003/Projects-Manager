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

function App() {
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
          <Route path="calendar" element={<Calendar />} />
        </Route>
        <Route path="/teams" element={<TeamDash />}>
          <Route path="teaminfo/:id" element={<TeamInfo />} />
          <Route path="members" element={<Members />} />
          <Route path="projects" element={<TeamProjects />} />
          <Route path="chat" element={<Chat />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
