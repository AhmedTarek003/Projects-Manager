import { FaRegBell } from "react-icons/fa";

const Header = () => {
  return (
    <div className="bg-white px-10 py-2 flex justify-between items-center shadow-lg rounded-md">
      <div className="flex items-center gap-1">
        <img
          src="https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp"
          alt="pic"
          className="w-10 object-cover rounded-full"
        />
        <div className="font-semibold">ahmed tarek</div>
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
