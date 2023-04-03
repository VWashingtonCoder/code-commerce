import "./Confirmation.css";
import { IoIosCheckmarkCircleOutline } from "react-icons/io"


const Confirmation = ({shipInfo}) => {
    console.log(shipInfo)
    const { city, country , name, state, street, zip } = shipInfo.addressData;
    const method = shipInfo.methodData.method;

    return (
        <div id="Confirmation">
            <h2 className="underline-border">Confirmation</h2>
            <div className="confirm-body">
                <IoIosCheckmarkCircleOutline className="check-circle"/>
                <h2>Congratulations. <br/> Your order is accepted.</h2>
                <p>
                    Your order will be delivered to {name} at {street}, {city}, {state} {zip} {country} in {method === "standard" ? "4-6 business days" : "1-3 business days"}. 
                </p>
            </div>
            <div className="btn-container">
                <button className="track-btn">Track Order</button>
                <button className="back-btn confirm-btn">Back To Cart</button>
            </div>
        </div>
    )
}

export default Confirmation;