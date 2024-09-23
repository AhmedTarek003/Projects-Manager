import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/admin/Dashboard";
import AllUsers from "./pages/admin/user/AllUsers";
import Admins from "./pages/admin/user/Admins";
import Teams from "./pages/admin/Teams";
import Projects from "./pages/admin/Projects";
import Calendar from "./pages/admin/Calendar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin_dashboard" element={<Dashboard />}>
          <Route path="users" element={<AllUsers />} />
          <Route path="admins" element={<Admins />} />
          <Route path="teams" element={<Teams />} />
          <Route path="projects" element={<Projects />} />
          <Route path="calendar" element={<Calendar />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
