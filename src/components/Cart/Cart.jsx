import { useState } from "react";
import "./Cart.css";
import StatusBar from "./StatusBar";
import Table from "./Table";
import Summary from "./Summary";

const Cart = () => {
  const [status, setStatus] = useState("1 out of stock item removed");
  const [subtotal, setSubtotal] = useState(50);
  const [total, setTotal] = useState(50);

  return (
    <div id="Cart">
      <div className="cart-info">
        {status && (<StatusBar status={status} />)}
        <Table />
      </div>
      <Summary sub={subtotal} total={total} />
    </div>
  );
};

export default Cart;
