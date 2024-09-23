import image from "../assets/web.png";

const NotFound = () => {
  return (
    <div className="text-center mt-20">
      <div>
        <img src={image} alt="" className="mx-auto" />
      </div>
      <div>
        <div className="text-2xl font-semibold text-gray-500">
          page not found
        </div>
        <p className="text-[#777]">
          the page you are looking for doesn{"'"}t exist or an other error
          occurred.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
