import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { projectActions } from "../../redux/slices/projectSlice";
import { request } from "../../utils/request";

const useUpdateProject = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const updateProject = async (id, values) => {
    setLoading(true);
    try {
      const { data } = await request.put(`/projects/${id}`, values);
      toast.success(data?.msg);
      dispatch(projectActions.getproject(data?.success && data?.updateProject));
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    } finally {
      setLoading(false);
    }
  };
  return { loading, updateProject };
};

export default useUpdateProject;
