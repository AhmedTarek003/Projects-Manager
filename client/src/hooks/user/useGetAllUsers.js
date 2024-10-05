import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { request } from "../../utils/request";
import { userActions } from "../../redux/slices/userSlice";

const useGetAllUsers = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const getAllUsers = async () => {
      setLoading(true);
      try {
        const { data } = await request.get("/users?is_role=all");
        dispatch(userActions.getAllUsers(data?.success && data?.users));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getAllUsers();
  }, [dispatch]);

  return { loading };
};

export default useGetAllUsers;
