import * as yup from "yup";

// const passwordRules =
//   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;

export const registerSchema = yup.object().shape({
  userName: yup.string().required("username is required"),
  email: yup.string().email("invalid email").required("email is required"),
  phoneNumber: yup.number().required("phone number is required"),
  role: yup.string().required("role is required"),
  password: yup.string().min(6).required("password is required"),
  // .matches(passwordRules, { message: "please enter a strong password" })
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "password must match")
    .required("required"),
});

export const createProjectSchema = yup.object().shape({
  projectName: yup.string().required("required"),
  team: yup.string().required("you must choose a team"),
  startDate: yup.date().required("required"),
  dueDate: yup.date().required("required"),
});

export const createTeamSchema = yup.object().shape({
  teamName: yup.string().required("required"),
  teamLeader: yup.string().required("you must choose a team leader"),
});

export const createTaskSchema = yup.object().shape({
  title: yup.string().required("required"),
  desc: yup.string().required("required"),
});
