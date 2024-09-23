import { Link } from "react-router-dom";
import { notifications } from "../utils/dummyData";

const NotificationDash = () => {
  return (
    <>
      <div className="flex-[4] bg-green-300 p-3 shadow-lg rounded-lg h-fit max-h-[350px] overflow-auto">
        <div className="text-center text-3xl text-gray-700">Notifications</div>
        <div className="mt-3">
          {notifications?.map((notification) => (
            <Link
              to={`/notifications/${notification?._id}`}
              key={notification?._id}
              className="bg-green-200 shadow-xl hover:bg-green-400 transition-all
              text-gray-900  my-3 p-2 rounded-md flex justify-between items-center"
            >
              <div className="font-bold">{notification?.title}</div>
              <div className="font-semibold">{notification?.team.teamName}</div>
              {notification?.isRead ? (
                <span className="block w-2 h-2 rounded-full bg-red-500"></span>
              ) : (
                <span></span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default NotificationDash;
