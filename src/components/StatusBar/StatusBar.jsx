import { AiFillCheckCircle } from "react-icons/ai";
import { TbTruckDelivery } from "react-icons/tb";
import { MdPayment } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import { useState } from "react";

const StatusBar = ({page}) => {
    const [barProgress, setBarProgress] = useState({ 
        ship: false, 
        pay: false,  
    });
    const { ship, pay } = barProgress;


    return (
        <div id="StatusBar">
            <div className="logo-circle cart">
                <AiFillCheckCircle />
            </div>
            <div className="logo-bar" style={{backgroundColor: "grey", height: "20px", width: "50px" }}></div>
            <div className="logo-circle ship">
                {barProgress.ship 
                    ? (<TbTruckDelivery />)
                    : (<AiFillCheckCircle />)
                }
            </div>
            <div className="logo-bar" style={{backgroundColor: "grey", height: "20px", width: "50px" }}></div>
            <div className="logo-circle pay">
                {barProgress.pay 
                    ? (<MdPayment />)
                    : (<AiFillCheckCircle />)
                }
            </div>
            <div className="logo-bar" style={{backgroundColor: "grey", height: "20px", width: "50px" }}></div>
            <div className="logo-circle confirm">
                <GiConfirmed />
            </div>
        </div>
    );
}

export default StatusBar;