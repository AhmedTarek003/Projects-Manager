import { Link } from "react-router-dom";
import { users } from "../../../utils/dummyData";
import { RiDeleteBin6Line, RiEyeLine } from "react-icons/ri";
import { useState } from "react";
import Swal from "sweetalert2";

const Admins = () => {
  const [search, setSearch] = useState("");

  const getAdmins = users.filter((user) => user.role === "admin");

  // eslint-disable-next-line no-unused-vars
  const deleteHandler = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("deleted");
      }
    });
  };
  return (
    <div className="p-5">
      <div className="text-center my-10 text-4xl font-semibold uppercase text-gray-700">
        Admins
      </div>
      <div className="flex items-center justify-between">
        <div className="text-lg">
          show{" "}
          <span className="font-bold text-blue-500">{getAdmins?.length}</span>{" "}
          Admins
        </div>
        <div className="w-[330px] ">
          <input
            type="search"
            placeholder="search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 p-3 w-full rounded-[7px] outline-none text-[15px] shadow-lg"
          />
        </div>
      </div>
      <div>
        <table className="table-auto mt-10 w-full">
          <thead className="bg-gray-600 text-white">
            <tr>
              <th className="p-2 border-b">#</th>
              <th className="p-2 border-b">User</th>
              <th className="p-2 border-b">Email</th>
              <th className="p-2 border-b">Phone</th>
              <th className="p-2 border-b">Role</th>
              <th className="p-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {getAdmins?.map((user, idx) => (
              <tr key={user?._id}>
                <td className="p-2 border bg-white">{idx + 1}</td>
                <td className="bg-white border p-2 flex gap-5 items-center">
                  <img
                    src={user?.profilePic.url}
                    alt=""
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span>{user?.userName}</span>
                </td>
                <td className="p-2 border bg-white">{user?.email}</td>
                <td className="p-2 border bg-white">{user?.phoneNumber}</td>
                <td className="p-2 border bg-white">{user?.role}</td>
                <td className="p-2 border bg-white">
                  <div className="flex justify-center items-center gap-5">
                    <Link to={`/admin_dashboard/users/${user?._id}`}>
                      <RiEyeLine className="text-blue-500" size={23} />
                    </Link>
                    <RiDeleteBin6Line
                      className="text-red-500 cursor-pointer"
                      size={23}
                      onClick={() => deleteHandler(user?._id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admins;
