import moment from "moment";
import { events } from "../utils/dummyData";

const EventsDash = () => {
  return (
    <div className="bg-blue-400 p-3 shadow-lg rounded-lg h-fit max-h-[350px] overflow-auto mt-3">
      <div className="text-center text-3xl text-white">Events</div>
      <div className="mt-3">
        {events?.map((event) => (
          <div
            key={event?._id}
            className="flex items-center justify-around p-2 bg-blue-200 rounded-lg shadow-lg my-3"
          >
            <div className="font-bold">{event?.title}</div>
            <div>{moment(event?.date).format("YYYY/MM/DD")}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsDash;
