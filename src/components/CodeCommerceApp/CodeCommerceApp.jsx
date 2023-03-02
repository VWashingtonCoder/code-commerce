import { useState } from "react";
import "./CodeCommerceApp.css";
import SignUpLogin from "../SignupLogin/SignupLogin";
import Cart from "../Cart/Cart";
import Shipping from "../Shipping/Shipping";
import Payment from "../Payment/Payment";
import Confirmation from "../Confirmation/Confirmation";

const CodeCommerceApp = () => {
    const pageKeys = ["login", "cart", "ship", "pay", "confirm"];
    const [page, setPage] = useState(pageKeys[1]);
    const [finalCart, setFinalCart] = useState({cart: [], subTotal: 0});

    const changePage = (key) => {
        setPage(key);
    }

    const updateFinal = (cartInfo) => {
        setFinalCart(cartInfo);
    }

    return (
        <div id="CodeCommerceApp">
            { page === "login" && (<SignUpLogin pageSet={changePage} />) }
            { page === "cart" && (<Cart pageSet={changePage} final={updateFinal} />) }
            { page === "ship" && (<Shipping />) }
            { page === "pay" && (<Payment />) }
            { page === "confirm" && (<Confirmation />) }
        </div>
    );
}

export default CodeCommerceApp;