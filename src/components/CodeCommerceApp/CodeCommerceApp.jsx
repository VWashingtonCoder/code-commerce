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

    const changePage = (key) => {
        setPage(key);
    }

    return (
        <div id="CodeCommerceApp">
            { page === "login" && (<SignUpLogin pageSet={changePage} />) }
            { page === "cart" && (<Cart />) }
            { page === "ship" && (<Shipping />) }
            { page === "pay" && (<Payment />) }
            { page === "confirm" && (<Confirmation />) }
        </div>
    );
}

export default CodeCommerceApp;