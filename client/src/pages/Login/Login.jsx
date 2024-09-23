import { useState } from "react";
import style from "./login.module.css";
import image from "../../assets/pngegg.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={`${style.login}`}>
      <div className="bg-[#000000cd] w-full h-full flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="bg-[#eee] w-[50%] max-md:w-[90%] p-5 md:h-[390px] flex items-center gap-5 rounded-sm"
        >
          <div className="flex-[2] max-md:hidden">
            <img src={image} alt="" />
          </div>
          <div className="flex-[3]">
            <div className="flex flex-col gap-1 ">
              <label className="">email</label>
              <input
                type="email"
                name="email"
                placeholder="enter your email"
                className="h-10 rounded-sm px-2 outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1 mt-3">
              <label>password</label>
              <input
                type="password"
                placeholder="enter your password"
                className="h-10 rounded-sm px-2 outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="float-right mx-3 mt-8 bg-blue-500 hover:bg-blue-600 py-[8px] px-5 rounded-sm text-white"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
