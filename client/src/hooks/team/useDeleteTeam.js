import { useDispatch } from "react-redux";
import { request } from "../../utils/request";
import { teamActions } from "../../redux/slices/teamSlice";
import toast from "react-hot-toast";

const useDeleteTeam = () => {
  const dispatch = useDispatch();

  const deleteTeam = async (id) => {
    try {
      const { data } = await request.delete(`/teams/${id}`);
      dispatch(teamActions.deleteteam(data?.success && data?.deletedTeam));
      toast.success(data?.msg);
    } catch (error) {
      console.log(error);
    }
  };
  return { deleteTeam };
};

export default useDeleteTeam;
