import { useFormik } from "formik";
import { registerSchema } from "../../utils/schema";
import { useState } from "react";

const AddUser = () => {
  const [file, setFile] = useState(null);

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
      userName: "",
      email: "",
      phoneNumber: "",
      role: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerSchema,
    onSubmit,
    validateOnBlur: false,
    validateOnChange: false,
  });

  return (
    <div>
      <div className="my-8 text-center text-3xl text-gray-800">
        Add New User
      </div>
      <div>
        <form onSubmit={handleSubmit} className="flex justify-center gap-10">
          <div className="w-fit mt-8">
            <label htmlFor="userPic" className="cursor-pointer">
              <img
                src={
                  file
                    ? URL.createObjectURL(file)
                    : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                }
                alt=""
                className="w-56 h-56 object-cover shadow-lg"
              />
            </label>
            <input
              type="file"
              id="userPic"
              hidden
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <div className="w-[30%] flex flex-col">
            <div className="flex flex-col ">
              <label>username</label>
              <input
                type="text"
                name="userName"
                id="userName"
                placeholder="enter your username"
                className={`p-2 mt-1 outline-none rounded-md shadow-sm ${
                  errors.userName && touched.userName ? "outline-red-500" : ""
                }`}
                value={values.userName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.userName && touched.userName && (
                <p className="text-red-500">{errors.userName}</p>
              )}
            </div>
            <div className="flex flex-col mt-3 ">
              <label>email</label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="enter your email"
                className={`p-2 mt-1 outline-none rounded-md shadow-sm ${
                  errors.email && touched.email ? "outline-red-500" : ""
                }`}
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.email && touched.email && (
                <p className="text-red-500">{errors.email}</p>
              )}
            </div>
            <div className="flex flex-col mt-3 ">
              <label>phone number</label>
              <input
                type="number"
                name="phoneNumber"
                id="phoneNumber"
                placeholder="enter your phone number"
                className={`p-2 mt-1 outline-none rounded-md shadow-sm ${
                  errors.phoneNumber && touched.phoneNumber
                    ? "outline-red-500"
                    : ""
                }`}
                value={values.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.phoneNumber && touched.phoneNumber && (
                <p className="text-red-500">{errors.phoneNumber}</p>
              )}
            </div>
            <div className="flex flex-col mt-3 ">
              <label>role</label>
              <select
                name="role"
                id="role"
                value={values.role}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`p-2 mt-1 outline-none rounded-md shadow-sm ${
                  errors.role && touched.role ? "outline-red-500" : ""
                }`}
              >
                <option value="user">User</option>
                <option value="teamLeader">Team Leader</option>
                <option value="admin">Admin</option>
              </select>
              {errors.role && touched.role && (
                <p className="text-red-500">{errors.role}</p>
              )}
            </div>
            <div className="flex flex-col mt-3 ">
              <label>password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="enter your password"
                className={`p-2 mt-1 outline-none rounded-md shadow-sm ${
                  errors.password && touched.password ? "outline-red-500" : ""
                }`}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.password && touched.password && (
                <p className="text-red-500">{errors.password}</p>
              )}
            </div>
            <div className="flex flex-col mt-3 ">
              <label>confirmPassword</label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="confirm password"
                className={`p-2 mt-1 outline-none rounded-md shadow-sm ${
                  errors.confirmPassword && touched.confirmPassword
                    ? "outline-red-500"
                    : ""
                }`}
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <p className="text-red-500">{errors.confirmPassword}</p>
              )}
            </div>
            <button
              type="submit"
              className="bg-blue-400 hover:bg-blue-500 transition-all mt-5 w-[50%] mx-auto
                p-[5px] rounded-md text-white text-xl"
              disabled={isSubmitting}
            >
              create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
