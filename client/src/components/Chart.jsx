import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const data = [
  {
    name: "Team A",
    rate: 4000,
  },
  {
    name: "Team B",
    rate: 2000,
  },
  {
    name: "Team c",
    rate: 1000,
  },
  {
    name: "Team d",
    rate: 10000,
  },
];

const Chart = () => {
  return (
    <div className="mt-10 bg-blue-400 text-white p-5 w-fit mx-auto rounded-md shadow-xl overflow-auto max-w-full">
      <div className="text-center mt-5 mb-10 text-3xl">Activity of Teams</div>
      <BarChart width={900} height={400} data={data} barSize={50}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="rate" fill="#0b376e" />
      </BarChart>
    </div>
  );
};

export default Chart;
