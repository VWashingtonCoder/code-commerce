import { useState } from "react";
import "./CodeCommerceApp.css";
import SignUpLogin from "../SignupLogin/SignupLogin";
import Cart from "../Cart/Cart";
import Shipping from "../Shipping/Shipping";
import Payment from "../Payment/Payment";
import Confirmation from "../Confirmation/Confirmation";
import OrderSummary from "../OrderSummary/OrderSummary";
// Test Datas
import { productsInfo } from "../data";
const testBag = [];
productsInfo.forEach(item => {
    const cartItem = {...item, quantity: 1};
    testBag.push(cartItem);
});

const CodeCommerceApp = () => {
    const pageKeys = ["login", "cart", "ship", "pay", "confirm"];
    const [page, setPage] = useState(pageKeys[2]);
    const [bag, setBag] = useState({bagItems: testBag, subTotal: 71.75}); //init_cart: [], subTotal: 0
    const [shipping, setShipping] = useState(0);
    const { bagItems, subTotal } = bag;

    const changePage = (key) => {
        setPage(key);
    }

    const updateFinal = (cartInfo) => {
        setBag(cartInfo);
    }

    return (
        <div id="CodeCommerceApp">
            { page === "login" && (<SignUpLogin pageSet={changePage} />) }
            { page === "cart" && (<Cart pageSet={changePage} final={updateFinal} />) }
            
            <div className="order-process">
                <OrderSummary bag={bagItems} subTotal={subTotal} page={page} ship={shipping}/>
                { page === "ship" && (<Shipping />) }
                { page === "pay" && (<Payment />) }
            </div>
            
            { page === "confirm" && (<Confirmation />) }
        </div>
    );
}

export default CodeCommerceApp;