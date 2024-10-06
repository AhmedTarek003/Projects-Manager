import { useEffect } from "react";
import { request } from "../../utils/request";
import { useDispatch } from "react-redux";
import { teamActions } from "../../redux/slices/teamSlice";

const useGetTeam = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getTeam = async () => {
      try {
        const { data } = await request.get("/teams/get_my_team");
        dispatch(teamActions.getTeam(data?.success && data?.team));
      } catch (error) {
        console.log(error);
      }
    };
    getTeam();
  }, [dispatch]);
};

export default useGetTeam;
