import { useFormik } from "formik";
import { createProjectSchema } from "../../utils/schema";
import { teams } from "../../utils/dummyData";

const AddProject = () => {
  const onSubmit = async (values, actions) => {
    console.log(values);
    actions.resetForm();
  };

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
      projectName: "",
      team: "",
      startDate: "",
      dueDate: "",
    },
    validationSchema: createProjectSchema,
    onSubmit,
    validateOnBlur: false,
    validateOnChange: false,
  });
  return (
    <div>
      <div className="my-8 text-center text-3xl text-gray-800">
        Create Project
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col  w-[40%] mx-auto">
        <div className="flex flex-col">
          <label>project name</label>
          <input
            type="text"
            name="projectName"
            id="projectName"
            placeholder="enter project name"
            className={`p-2 mt-1 outline-none rounded-md shadow-sm ${
              errors.projectName && touched.projectName ? "outline-red-500" : ""
            }`}
            value={values.projectName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.projectName && touched.projectName && (
            <p className="text-red-500">{errors.projectName}</p>
          )}
        </div>
        <div className="flex flex-col mt-3">
          <label>Team</label>
          <select
            onChange={handleChange}
            onBlur={handleBlur}
            name="team"
            id="team"
            className={`p-2 mt-1 outline-none rounded-md shadow-sm ${
              errors.team && touched.team ? "outline-red-500" : ""
            }`}
          >
            <option value="" hidden>
              select team
            </option>
            {teams?.map((team) => (
              <option key={team?._id} value={team?.teamName}>
                {team?.teamName}
              </option>
            ))}
          </select>
          {errors.team && touched.team && (
            <p className="text-red-500">{errors.team}</p>
          )}
        </div>
        <div className="flex gap-3 mt-3">
          <div className="flex flex-col flex-1">
            <label>Start Date</label>
            <input
              type="datetime-local"
              name="startDate"
              id="startDate"
              className={`p-2 mt-1 outline-none rounded-md shadow-sm  ${
                errors.startDate && touched.startDate ? "outline-red-500" : ""
              }`}
              value={values.startDate}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.startDate && touched.startDate && (
              <p className="text-red-500">{errors.startDate}</p>
            )}
          </div>
          <div className="flex flex-col flex-1">
            <label>Due Date</label>
            <input
              type="datetime-local"
              name="dueDate"
              id="dueDate"
              className={`p-2 mt-1 outline-none rounded-md shadow-sm  ${
                errors.dueDate && touched.dueDate ? "outline-red-500" : ""
              }`}
              value={values.dueDate}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.dueDate && touched.dueDate && (
              <p className="text-red-500">{errors.dueDate}</p>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-400 hover:bg-blue-500 transition-all mt-5 w-[50%] mx-auto
                p-[5px] rounded-md text-white text-xl"
          disabled={isSubmitting}
        >
          create
        </button>
      </form>
    </div>
  );
};

export default AddProject;
