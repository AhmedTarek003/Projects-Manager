import Chart from "./Chart";
import NotificationDash from "./NotificationDash";
import ProjectsDash from "./ProjectsDash";

const DashboardContent = () => {
  return (
    <div className="p-3">
      <div className="flex gap-3 flex-wrap justify-center">
        <div className="bg-green-500 text-white p-5 h-32 flex justify-center flex-col items-center gap-5 rounded-md shadow-lg">
          <div className="text-3xl font-semibold">All Projects</div>
          <span className="text-2xl font-bold">30</span>
        </div>
        <div className="bg-green-500 text-white p-5 h-32 flex justify-center flex-col items-center gap-5 rounded-md shadow-lg">
          <div className="text-3xl font-semibold">Completed Projects</div>
          <span className="text-2xl font-bold">25</span>
        </div>
        <div className="bg-green-500 text-white p-5 h-32 flex justify-center flex-col items-center gap-5 rounded-md shadow-lg">
          <div className="text-3xl font-semibold">Uncompleted Projects</div>
          <span className="text-2xl font-bold">4</span>
        </div>
        <div className="bg-green-500 text-white p-5 h-32 flex justify-center flex-col items-center gap-5 rounded-md shadow-lg">
          <div className="text-3xl font-semibold">Canceled Projects</div>
          <span className="text-2xl font-bold">1</span>
        </div>
        <div className="bg-blue-500 text-white w-52 p-5 h-32 flex justify-center flex-col items-center gap-5 rounded-md shadow-lg">
          <div className="text-3xl font-semibold">Teams</div>
          <span className="text-2xl font-bold">10</span>
        </div>
      </div>
      <div className="flex gap-5 mt-5">
        <ProjectsDash />
        <NotificationDash />
      </div>
      <Chart />
    </div>
  );
};

export default DashboardContent;
