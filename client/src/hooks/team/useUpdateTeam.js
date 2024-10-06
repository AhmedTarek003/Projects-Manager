import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { request } from "../../utils/request";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { teamActions } from "../../redux/slices/teamSlice";

const useUpdateTeam = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateTeam = async (id, values) => {
    setLoading(true);
    try {
      const { data } = await request.put(`/teams/${id}`, values);
      toast.success(data?.msg);
      dispatch(teamActions.getTeam(data?.success && data?.updatedTeam));
      navigate(`/teams/teaminfo/${id}`);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    } finally {
      setLoading(false);
    }
  };
  return { loading, updateTeam };
};

export default useUpdateTeam;
