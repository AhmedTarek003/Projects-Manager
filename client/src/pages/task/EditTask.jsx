import { useFormik } from "formik";
import { createTaskSchema } from "../../utils/schema";
import { task } from "../../utils/dummyData";

const EditTask = () => {
  // const { projectid } = useParams();
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
      title: task?.title,
      desc: task?.desc,
      project: task?.project.projectName,
    },
    validationSchema: createTaskSchema,
    onSubmit,
    validateOnBlur: false,
    validateOnChange: false,
  });
  return (
    <div>
      <div className="my-8 text-center text-3xl text-gray-800">Edit Task</div>
      <form onSubmit={handleSubmit} className="flex flex-col  w-[40%] mx-auto">
        <div className="flex flex-col">
          <label>title</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="enter task title"
            className={`p-2 mt-1 outline-none rounded-md shadow-sm ${
              errors.title && touched.title ? "outline-red-500" : ""
            }`}
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.title && touched.title && (
            <p className="text-red-500">{errors.title}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label>description</label>
          <textarea
            name="desc"
            id="desc"
            placeholder="enter task description"
            className={`p-2 mt-1 outline-none rounded-md shadow-sm ${
              errors.desc && touched.desc ? "outline-red-500" : ""
            }`}
            value={values.desc}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.desc && touched.desc && (
            <p className="text-red-500">{errors.desc}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label>project</label>
          <input
            className={`p-2 mt-1 outline-none rounded-md shadow-sm text-[#777]`}
            value={values.project}
            onChange={handleChange}
            onBlur={handleBlur}
            readOnly={true}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-400 hover:bg-blue-500 transition-all mt-5 w-[50%] mx-auto
                p-[5px] rounded-md text-white text-xl"
          disabled={isSubmitting}
        >
          Edit
        </button>
      </form>
    </div>
  );
};

export default EditTask;
