import "./Confirmation.css";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

const Confirmation = ({ shipInfo, backToCart }) => {
  const { city, country, name, state, street, zip } = shipInfo.addressData;
  const method = shipInfo.methodData.method;

  return (
    <div id="Confirmation">
      <h2 className="page-title underline-border">Confirmation</h2>
      <div className="confirm-body">
        <IoIosCheckmarkCircleOutline className="check-circle" />
        <h2>
          Congratulations. <br /> Your order is accepted.
        </h2>
        <p>
          Your order will be delivered to {name} at
          <br />
          {street}, {city}, {state}, {country} {zip}
          <br />
          via {method} delivery.
        </p>
      </div>
      <div className="btn-container">
        <button className="checkout-btn track-btn">Track Order</button>
        <button className="back-btn confirm-btn" onClick={backToCart}>
          Back To Cart
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
