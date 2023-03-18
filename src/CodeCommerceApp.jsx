import { useState } from "react";
import "./CodeCommerceApp.css";
import { pageKeys, initBag, initTotals, shippingFormValues, initBarProgress } from "./data";
import { validateValues } from "./helpers";
import SignUpLogin from "./pages/SignupLogin/SignupLogin";
import Cart from "./pages/Cart/Cart";
import Shipping from "./pages/Shipping/Shipping";
import Payment from "./pages/Payment/Payment";
import Confirmation from "./pages/Confirmation/Confirmation";
import StatusBar from "./components/StatusBar/StatusBar";
import Summary from "./components/Summary/Summary";

const CodeCommerceApp = () => {
  const [page, setPage] = useState(pageKeys[2]);
  const [bag, setBag] = useState(initBag);
  const [disabled, setDisabled] = useState(false);
  const [totals, setTotals] = useState({ ...initTotals, discount: 4.50, total: 68.25 });
  const [barProgress, setBarProgress] = useState(initBarProgress);
  const [shipFormValues, setShipFormValues] = useState(shippingFormValues);
  const { items, subtotal, shipCost, discount, total } = totals;
  

  const changePage = () => {
    const pageIdx = pageKeys.findIndex((key) => key === page);
    setPage(pageKeys[pageIdx + 1]);
  };

  const checkout = () => {
    switch (page) {
      case "cart":
        setTotals({ 
          ...totals, 
          discount: 4.50, 
          total: total - 4.5 
        });
        setDisabled(true);
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
      total: sub,
    });
  };
  const updateShipFormValues = (e) => {
    const { name, value } = e.target;
    const valid = validateValues(name, value);

    if (valid) 
      setShipFormValues({ ...shipFormValues, [name]: value });
    
    if (name === "method") {
      if (value === "standard" && shipCost === 5) {
        setTotals({ 
            ...totals, 
            shipCost: 0, 
            total: total - 5 
          });
      } else if (value === "express") {
        setTotals({ 
          ...totals, 
          shipCost: 5, 
          total: total + 5 
        });
      }
    }
  }

  return (
    <div id="CodeCommerceApp">
      {page === "signLog" && <SignUpLogin pageSet={changePage} />}

      {page !== "signLog" && (
        <div className="page-container">
          {page === "cart" ? (
            <Cart
              bag={bag}
              itemTotals={items}
              updateBag={updateBag}
              updateDisabled={updateDisabled}
              updateQty={updateBagQty}
              updateTotals={updateTotals}
            />
          ) : (
            <div className="page-status">
              <StatusBar progress={barProgress} />
              {page === "ship" && (
                <Shipping form={shipFormValues} updateVals={updateShipFormValues} />
              )}
            </div>
          )}
          <Summary
            bag={bag}
            discount={discount}
            page={page}
            itemTotals={items}
            shipCost = {shipCost}
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
