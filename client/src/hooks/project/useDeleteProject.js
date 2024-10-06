import { useDispatch } from "react-redux";
import { request } from "../../utils/request";
import { projectActions } from "../../redux/slices/projectSlice";
import toast from "react-hot-toast";

const useDeleteProject = () => {
  const dispatch = useDispatch();

  const deleteProject = async (id) => {
    try {
      const { data } = await request.delete(`/projects/${id}`);
      dispatch(
        projectActions.deleteproject(data?.success && data?.deletedProject)
      );
      toast.success(data?.msg);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };
  return { deleteProject };
};

export default useDeleteProject;
