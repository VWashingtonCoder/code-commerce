import { useState } from "react";
import "./CodeCommerceApp.css";
import { pageKeys, initBag, initTotals } from "./data";
import SignUpLogin from "./pages/SignupLogin/SignupLogin";
import Cart from "./pages/Cart/Cart";
import Shipping from "./pages/Shipping/Shipping";
import Payment from "./pages/Payment/Payment";
import Confirmation from "./pages/Confirmation/Confirmation";
import Summary from "./components/Summary/Summary";

const CodeCommerceApp = () => {
  const [page, setPage] = useState(pageKeys[2]);
  const [bag, setBag] = useState(initBag);
  const [disabled, setDisabled] = useState(false);
  const [totals, setTotals] = useState({ ...initTotals, total: 68.25 });
  const { items, subtotal, total } = totals;
  const [discount, setDiscount] = useState(4.50); // init_0

  const changePage = () => {
    const pageIdx = pageKeys.findIndex((key) => key === page);
    setPage(pageKeys[pageIdx + 1]);
  };

  const checkout = () => {
    switch (page) {
      case "cart":
        setDiscount(4.5);
        setTotals({ ...totals, total: total - 4.5 });
        break;
      default:
        break;
    }
    changePage();
  };
  
  const updateBag = (bag) => {
    setBag(bag);
  };
  
  const updateBagQty = (qty) => {
    setBag({ ...bag, quantities: qty });
  };
  
  const updateDisabled = () => {
    setDisabled(!disabled);
  };

  const updateTotals = (itemTotals) => {
    let sub = 0;
    const itemTotalsArr = Object.values(itemTotals);
    itemTotalsArr.forEach((total) => (sub = sub + total));
    setTotals({ 
      items: itemTotals, 
      subtotal: sub, 
      total: sub 
    });
  };

  return (
    <div id="CodeCommerceApp">
      {page === "signLog" && <SignUpLogin pageSet={changePage} />}

      {page !== "signLog" && (
        <div className="page-container">
          {page === "cart" && (
            <Cart
              bag={bag}
              itemTotals={items}
              updateBag={updateBag}
              updateDisabled={updateDisabled}
              updateQty={updateBagQty}
              updateTotals={updateTotals}
            />
          )}
          {page === "ship" && <Shipping />}

          <Summary
            bag={bag}
            discount={discount}
            page={page}
            itemTotals={items}
            sub={subtotal}
            total={total}
            checkout={checkout}
            disabled={disabled}
          />
        </div>
      )}

      
      {page === "pay" && <Payment />}
      {page === "confirm" && <Confirmation />}
    </div>
  );
};

export default CodeCommerceApp;
