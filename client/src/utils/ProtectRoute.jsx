import { Navigate, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import useAuth from "../hooks/user/useAuth";

const ProtectRoute = ({ children }) => {
  useAuth();
  const { authUser } = useAuthContext();
  const adminLastPath = localStorage.getItem("alp");
  const teamLastPath = localStorage.getItem("tlp");
  const navigate = useNavigate();

  if (authUser && authUser?.user?.role === "admin") {
    <Navigate to={adminLastPath} />;
  } else if (
    (authUser && authUser?.user?.role === "teamLeader") ||
    (authUser && authUser?.user?.role === "user")
  ) {
    <Navigate to={teamLastPath} />;
  } else {
    navigate("/");
  }

  return children;
};

export default ProtectRoute;
