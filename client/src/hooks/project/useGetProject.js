import { useDispatch } from "react-redux";
import { request } from "../../utils/request";
import { projectActions } from "../../redux/slices/projectSlice";
import { useEffect, useState } from "react";

const useGetProject = (id) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const getProject = async () => {
      setLoading(true);
      try {
        const { data } = await request.get(`/projects/${id}`);
        dispatch(projectActions.getproject(data?.success && data?.project));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getProject();
  }, [dispatch, id]);
  return { loading };
};

export default useGetProject;
