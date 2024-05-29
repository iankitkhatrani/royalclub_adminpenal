import ProtoTypes from "prop-types";
import square from "../../assets/images/shapes/square.svg";
import vline from "../../assets/images/shapes/vline.svg";
import dotted from "../../assets/images/shapes/dotted.svg";

function RightSide({ img }) {
  return (
    <div className="lg:w-1/2 lg:block hidden bg-[#F6FAFF] dark:bg-darkblack-600 p-20 relative min-h-screen ">
      <ul>
        <li className="absolute top-10 left-8">
          <img src={square} alt="" />
        </li>
        <li className="absolute right-12 top-14">
          <img src={vline} alt="" />
        </li>
        <li className="absolute bottom-1 left-8">
          <img src={dotted} alt="" />
        </li>
      </ul>
      <div className="">
        <img src={img} alt="" />
      </div>
      <div>
       
      </div>
    </div>
  );
}

RightSide.propTypes = {
  img: ProtoTypes.string,
};

export default RightSide;
