import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { request } from "../../utils/request";
import { projectActions } from "../../redux/slices/projectSlice";

const useGetAllProjects = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const getAllTeams = async () => {
      setLoading(true);
      try {
        const { data } = await request.get("/projects");
        dispatch(
          projectActions.getAllprojects(data?.success && data?.projects)
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getAllTeams();
  }, [dispatch]);

  return { loading };
};

export default useGetAllProjects;
