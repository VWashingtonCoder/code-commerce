import { AiFillCheckCircle } from "react-icons/ai";
import { TbTruckDelivery } from "react-icons/tb";
import { MdPayment } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import "./StatusBar.css";

const StatusBar = ({ progress }) => {
  const { ship, pay } = progress;

  return (
    <div id={`${!pay ? "StatusBar" : "FullBar"}`} className="flex-align-center">
      <div className="logo-circle done">
        <AiFillCheckCircle />
      </div>
      <div className="logo-bar done"></div>
      <div className={`logo-circle ${ship && "done"}`}>
        {ship ? <AiFillCheckCircle /> : <TbTruckDelivery />}
      </div>
      <div className={`logo-bar ${ship && "done"}`}></div>
      <div className={`logo-circle ${pay && "done"}`}>
        {pay ? <AiFillCheckCircle /> : <MdPayment />}
      </div>
      <div className={`logo-bar ${pay && "done"}`}></div>
      <div className={`logo-circle confirm ${pay && "done"}`}>
        <GiConfirmed />
      </div>
    </div>
  );
};

export default StatusBar;
