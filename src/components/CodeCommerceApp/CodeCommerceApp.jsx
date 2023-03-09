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
    const [totals, setTotals] = useState(
        { subtotal: 72.75, total: 72.75 }
    )
    const { subtotal, total } = totals;
    const [discount, setDiscount] = useState(
        page === "cart" ? 0 : 4.50
    );
    
    const changePage = () => {
        const pageIdx = pages.findIndex(page);
        setPage(pages[pageIdx + 1]);
    }
    const checkout = () => {
        console.log("clicked");
        // changePage();
    }
    const updateTotals = (totals) => {
        let sub = 0;
        totals.forEach((total) => sub = sub + total);
        setTotals({ subtotal: sub, total: sub });
    }
    const updateDisabled = () => { 
        setDisabled(!disabled); 
    };
    const updateBag = (bag) => {
        setBag(bag);
    }
    const updateBagQty = (qty) => {
        setBag({ ...bag, quantities: qty });
    }
    
    return (
        <div id="CodeCommerceApp">
            { page === "signLog" && (<SignUpLogin pageSet={changePage} />) }
            
            
            { page !== "signLog" && (
                <div className="page-container">
                    { page === "cart" && (
                        <Cart
                            bag={bag}
                            updateBag={updateBag}
                            updateDisabled={updateDisabled}
                            updateTotals={updateTotals}
                            updateQty={updateBagQty} 
                        />
                    )}
                    
                    <Summary 
                        sub={subtotal} 
                        total={total} 
                        checkout={checkout} 
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