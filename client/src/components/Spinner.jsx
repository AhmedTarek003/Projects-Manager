import { RotatingLines } from "react-loader-spinner";
const Spinner = () => {
  return (
    <div className="absolute w-full h-full top-0 left-0 flex justify-center items-center">
      <RotatingLines
        visible={true}
        height="96"
        width="96"
        color="grey"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Spinner;
