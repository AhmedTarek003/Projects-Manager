import { useState } from "react";
import { FaRegBell, FaCaretUp } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import useLogout from "../hooks/auth/useLogout";
import { useAuthContext } from "../context/authContext";

const Header = () => {
  const { authUser } = useAuthContext();
  const [dropdown, setDropdown] = useState(false);
  const { logout } = useLogout();
  const handleLogout = async () => {
    await logout();
  };
  return (
    <div className="bg-white px-10 py-2 flex justify-between items-center shadow-lg rounded-md">
      <div className="flex items-center gap-1">
        <img
          src={authUser?.user?.profilePic?.url}
          alt="pic"
          className="w-10 h-10 object-cover rounded-full"
        />
        <div
          className="flex items-center gap-1  p-2 cursor-pointer select-none relative"
          onClick={() => setDropdown(!dropdown)}
        >
          <div className="font-semibold">{authUser?.user?.userName}</div>
          <FaCaretUp
            className={`transition-all ${
              dropdown && "rotate-180 transition-all"
            }`}
          />
          {dropdown && (
            <div className="absolute z-50 top-[47px] w-[140px] px-2 min-h-[50px] bg-[#f8f7f7]">
              <li
                className="p-2 mt-1 list-none flex text-red-500 hover:text-red-600 font-semibold text-lg items-center gap-2"
                onClick={handleLogout}
              >
                logout <MdLogout size={24} />
              </li>
            </div>
          )}
        </div>
      </div>
      <div className="relative">
        <FaRegBell size={24} color="#22c55e" />
        <span
          className="absolute -top-2 -right-1 bg-red-400 w-5 h-5 rounded-full flex justify-center items-center text-[14px] font-semibold
        text-white"
        >
          3
        </span>
      </div>
    </div>
  );
};

export default Header;
