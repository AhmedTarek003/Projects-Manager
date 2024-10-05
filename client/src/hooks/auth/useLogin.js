import toast from "react-hot-toast";
import { useAuthContext } from "../../context/authContext";
import { useState } from "react";
import { request } from "../../utils/request";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (email, password) => {
    const success = handleInputErrors(email, password);
    if (!success) return;
    setLoading(true);
    try {
      const { data } = await request.post(`/auth/login`, { email, password });
      toast.success(data.msg);
      setAuthUser(data);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    } finally {
      setLoading(false);
    }
  };
  return { loading, login };
};

export default useLogin;

function handleInputErrors(email, password) {
  if (!email || !password) {
    toast.error("please fill all fields");
    return false;
  }
  return true;
}
