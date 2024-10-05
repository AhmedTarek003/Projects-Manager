import { useState } from "react";
import { useAuthContext } from "../../context/authContext";
import toast from "react-hot-toast";
import { request } from "../../utils/request";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const logout = async () => {
    setLoading(true);
    try {
      const { data } = await request.post("/auth/logout");
      setAuthUser(null);
      toast.success(data?.msg);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    } finally {
      setLoading(false);
    }
  };
  return { logout, loading };
};

export default useLogout;
