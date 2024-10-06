import { useState } from "react";
import toast from "react-hot-toast";
import { request } from "../../utils/request";
import { useNavigate } from "react-router-dom";

const useCreateTeam = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const createTeam = async (values) => {
    setLoading(true);
    try {
      const { data } = await request.post(`/teams`, values);
      toast.success(data?.msg);
      navigate("/admin_dashboard/teams");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    } finally {
      setLoading(false);
    }
  };
  return { loading, createTeam };
};

export default useCreateTeam;
