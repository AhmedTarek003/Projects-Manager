import { useState } from "react";
import toast from "react-hot-toast";
import { request } from "../../utils/request";
import { useNavigate } from "react-router-dom";

const useCreateUser = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const createUser = async (values, file) => {
    const formData = new FormData();
    formData.append("userName", values.userName);
    formData.append("email", values.email);
    formData.append("phoneNumber", values.phoneNumber);
    formData.append("password", values.password);
    if (file) {
      formData.append("image", file);
    }
    setLoading(true);
    try {
      const { data } = await request.post("/auth/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(data?.msg);
      navigate("/admin_dashboard/users");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    } finally {
      setLoading(false);
    }
  };
  return { createUser, loading };
};

export default useCreateUser;
