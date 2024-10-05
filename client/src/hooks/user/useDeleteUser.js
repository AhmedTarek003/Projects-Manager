import { useDispatch } from "react-redux";
import { request } from "../../utils/request";
import { userActions } from "../../redux/slices/userSlice";
import toast from "react-hot-toast";

const useDeleteUser = () => {
  const dispatch = useDispatch();

  const deleteUser = async (id) => {
    try {
      const { data } = await request.delete(`users/${id}`);
      dispatch(userActions.deleteUser(data?.success && data?.deletedUser));
      toast.success(data?.msg);
    } catch (error) {
      console.log(error);
    }
  };
  return { deleteUser };
};

export default useDeleteUser;
