import { useState } from "react";
import "./CodeCommerceApp.css";
import { pages, initBag } from "../data";
import SignUpLogin from "../SignupLogin/SignupLogin";
import Cart from "../Cart/Cart";
import Shipping from "../Shipping/Shipping";
import Payment from "../Payment/Payment";
import Confirmation from "../Confirmation/Confirmation";
import Summary from "../Summary/Summary";


const CodeCommerceApp = () => {    
    const [page, setPage] = useState(pages[1]);
    const [bag, setBag] = useState(initBag);
    const [disabled, setDisabled] = useState(false);
    const { products, subtotal, discount, total } = bag;

    const changePage = () => {
        const pageIdx = pages.findIndex(page);
        setPage(pages[pageIdx + 1]);
    }

    const updateTotals = (totals) => {
        let sub = 0;
        totals.forEach((total) => sub = sub + total);
        setBag({ ...bag, subtotal: sub, total: sub});
    }

    const updateDisabled = () => {
       setDisabled(!disabled); 
    }

    const updateBag = (cartInfo) => {
        const { cart, sub } = cartInfo;
        const discount = 4.50;
        setBag({
            products: cart,
            subtotal: sub,
            discount: discount,
            total: sub - discount
        });
    }

    return (
        <div id="CodeCommerceApp">
            { page === "signLog" && (<SignUpLogin pageSet={changePage} />) }
            
            { page !== "signLog" && (
                <div className="page-container">
                    { page === "cart" && (
                        <Cart
                            bag={products} 
                            updateTotals={updateTotals}
                            // updateQty={updateQuantity}
                            // pageSet={changePage}
                            // final={updateBag}
                            
                            // updateDisabled={updateDisabled} 
                        />
                    )}
                    <Summary 
                        sub={subtotal} 
                        total={total} 
                        // checkout={checkout} 
                        disabled={disabled} 
                    />
                </div>
            )}
            
            
            
            
            
            
            
            
            { page === "ship" && (<Shipping />) }
            { page === "pay" && (<Payment />) }
            { page === "confirm" && (<Confirmation />) }
        </div>
    );
}

export default CodeCommerceApp;