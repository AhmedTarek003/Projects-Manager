import { useState } from "react";
import { useDispatch } from "react-redux";
import { request } from "../../utils/request";
import toast from "react-hot-toast";
import { teamActions } from "../../redux/slices/teamSlice";

const useUpdateTeamImage = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const updateTeamImg = async (id, file) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("image", file);
    try {
      const { data } = await request.put(
        `/teams/update_team_image/${id}`,
        formData
      );
      toast.success(data?.msg);
      dispatch(teamActions.getTeam(data?.success && data?.updatedTeam));
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    } finally {
      setLoading(false);
    }
  };
  return { loading, updateTeamImg };
};

export default useUpdateTeamImage;
