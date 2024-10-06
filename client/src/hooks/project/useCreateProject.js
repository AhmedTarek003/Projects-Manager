import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { request } from "../../utils/request";
import toast from "react-hot-toast";

const useCreateProject = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const createProject = async (values) => {
    setLoading(true);
    try {
      const { data } = await request.post(`/projects`, values);
      toast.success(data?.msg);
      navigate("/admin_dashboard/projects");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    } finally {
      setLoading(false);
    }
  };
  return { loading, createProject };
};

export default useCreateProject;
