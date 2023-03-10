import { useState } from "react";
import "./CodeCommerceApp.css";
import { pageKeys, initBag, productsTotals } from "../data";
import SignUpLogin from "../SignupLogin/SignupLogin";
import Cart from "../Cart/Cart";
import Shipping from "../Shipping/Shipping";
import Payment from "../Payment/Payment";
import Confirmation from "../Confirmation/Confirmation";
import Summary from "../Summary/Summary";

const CodeCommerceApp = () => {
  const [page, setPage] = useState(pageKeys[1]);
  const [bag, setBag] = useState(initBag);
  const [disabled, setDisabled] = useState(false);
  const [totals, setTotals] = useState({ 
    items: productsTotals,
    subtotal: 72.75, 
    total: 72.75 
  });
  const { items, subtotal, total } = totals;
  const [discount, setDiscount] = useState(0);


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

          <Summary
            bag={bag}
            discount={discount}
            page={page}
            sub={subtotal}
            total={total}
            checkout={checkout}
            disabled={disabled}
          />
        </div>
      )}

      {page === "ship" && <Shipping />}
      {page === "pay" && <Payment />}
      {page === "confirm" && <Confirmation />}
    </div>
  );
};

export default CodeCommerceApp;
