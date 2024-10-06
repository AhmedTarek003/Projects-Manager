import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { request } from "../../utils/request";
import { teamActions } from "../../redux/slices/teamSlice";
const useGetAllTeams = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const getAllTeams = async () => {
      setLoading(true);
      try {
        const { data } = await request.get("/teams");
        dispatch(teamActions.getAllteams(data?.success && data?.teams));
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

export default useGetAllTeams;
