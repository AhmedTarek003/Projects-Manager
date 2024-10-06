import { useFormik } from "formik";
import { createTeamSchema } from "../../utils/schema";
import { useParams } from "react-router-dom";
import useUpdateTeam from "../../hooks/team/useUpdateTeam";
import Spinner from "../../components/Spinner";
import { useSelector } from "react-redux";
import useGetTeam from "../../hooks/team/useGetTeam";
import { useEffect } from "react";

const EditTeamInfo = () => {
  const { id } = useParams();
  const { loading, updateTeam } = useUpdateTeam();
  const onSubmit = async (values) => {
    await updateTeam(id, values);
  };
  useGetTeam();
  const { team } = useSelector((state) => state.team);

  const {
    values,
    handleBlur,
    handleSubmit,
    handleChange,
    errors,
    touched,
    isSubmitting,
  } = useFormik({
    initialValues: {
      teamName: team?.teamName,
    },
    validationSchema: createTeamSchema,
    onSubmit,
    validateOnBlur: false,
    validateOnChange: false,
  });

  useEffect(() => {
    if (team) {
      values.teamName = team?.teamName;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [team]);

  // const getTeamLeaders = users?.filter((user) => user?.role === "teamLeader");

  return (
    <div>
      <div className="my-8 text-center text-3xl text-gray-800">Edit Team</div>
      <form onSubmit={handleSubmit} className="flex flex-col  w-[40%] mx-auto">
        <div className="flex flex-col">
          <label>Team Name</label>
          <input
            type="text"
            name="teamName"
            id="teamName"
            placeholder="enter team name"
            className={`p-2 mt-1 outline-none rounded-md shadow-sm ${
              errors.teamName && touched.teamName ? "outline-red-500" : ""
            }`}
            value={values.teamName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.teamName && touched.teamName && (
            <p className="text-red-500">{errors.teamName}</p>
          )}
        </div>
        {/* <div className="flex flex-col mt-3">
          <label>Team Leader</label>
          <select
            name="teamLeader"
            id="teamLeader"
            value={values.teamLeader}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`p-2 mt-1 outline-none rounded-md shadow-sm ${
              errors.teamLeader && touched.teamLeader ? "outline-red-500" : ""
            }`}
          >
            <option value="" hidden>
              select team leader
            </option>
            {getTeamLeaders?.map((leader) => (
              <option key={leader?._id} value={leader?.userName}>
                {leader?.userName}
              </option>
            ))}
          </select>
          {errors.teamLeader && touched.teamLeader && (
            <p className="text-red-500">{errors.teamLeader}</p>
          )}
        </div> */}
        <button
          type="submit"
          className="bg-blue-400 hover:bg-blue-500 transition-all mt-5 w-[50%] mx-auto
                p-[5px] rounded-md text-white text-xl"
          disabled={isSubmitting}
        >
          Edit
        </button>
      </form>
      {loading && <Spinner />}
    </div>
  );
};

export default EditTeamInfo;
