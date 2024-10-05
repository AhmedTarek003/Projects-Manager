import { useEffect } from "react";
import { useAuthContext } from "../../context/authContext";
import { request } from "../../utils/request";

const useAuth = () => {
  const { setAuthUser } = useAuthContext();
  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await request.get("/users/get_user");
        setAuthUser(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [setAuthUser]);
};

export default useAuth;
