import { useState } from "react";
import "./CodeCommerceApp.css";
import {
  pageKeys,
  initBag,
  initTotals,
  initShipFormValues,
  initShipFormErrors,
  initBarProgress,
  shipMethods
} from "./data";
import { validateValues } from "./helpers";
import SignUpLogin from "./pages/P1.SignupLogin/SignupLogin";
import Cart from "./pages/P2.Cart/Cart";
import Shipping from "./pages/P3.Shipping/Shipping";
import Payment from "./pages/P4.Payment/Payment";
import Confirmation from "./pages/P5.Confirmation/Confirmation";
import StatusBar from "./components/StatusBar/StatusBar";
import Summary from "./components/Summary/Summary";

const testData = {
  account: {
    key: 1,
    email: "ex@aol.com",
    password: "Password2022*",
    name: "Andre Blaze",
    zip: 81004,
  },
  barProgress: {
    ship: true,
    pay: false
  },
  shipForm: {
    addressTitle: "Home",
    name: "Andre Blaze",
    street: "88 Ex St",
    zip: "81457",
    country: "USA",
    city: "Fountain",
    state: "CO",
    cellCode: "719",
    cellNum: "8504",
    telCode: "789",
    telNum: "5486"
  },
  totals: { 
    items: { DS: 21.5, MHA: 27.25, NAR: 24 },
    subtotal: 72.75,
    shipCost: 0,
    discount: 4.50, 
    total: 72.75 - 4.50
  }
};


const CodeCommerceApp = () => {
  const [page, setPage] = useState(pageKeys[3]);
  const [activeAccount, setActiveAccount] = useState(testData.account);
  const [bag, setBag] = useState(initBag);
  const [disabled, setDisabled] = useState(true); // init: false
  const [totals, setTotals] = useState(testData.totals);
  const [barProgress, setBarProgress] = useState(testData.barProgress);
  const [shipFormValues, setShipFormValues] = useState(testData.shipForm);
  const [shipFormErrors, setShipFormErrors] = useState(initShipFormErrors);
  const [shipMethod, setShipMethod] = useState(shipMethods[0]);
  const { items, subtotal, shipCost, discount, total } = totals;

  const resetShipState = () => {
    setTotals(initTotals);
    setBarProgress(initBarProgress);
    setShipFormValues(initShipFormValues);
    setShipMethod("standard");
    setDisabled(false);
  };

  const changePage = () => {
    const pageIdx = pageKeys.findIndex((key) => key === page);
    setPage(pageKeys[pageIdx + 1]);
  };

  const changePageBack = () => {
    const pageIdx = pageKeys.findIndex((key) => key === page);
    setPage(pageKeys[pageIdx - 1]);

    if (page === "ship") {
      resetShipState();
    }
  };

  const checkFullForm = () => {
    if (
      (!Object.values(shipFormValues).includes("") && disabled === true) ||
      (Object.values(shipFormValues).includes("") && disabled === false)
    )
      setDisabled(!disabled);
  };

  const checkout = () => {
    if (page === "cart"){
      setTotals({
        ...totals,
        discount: 4.5,
        total: total - 4.5,
      });
    } else if (page === "ship") {
      setBarProgress({ ...barProgress, ship: true });
    }
    
    changePage();
    setDisabled(true);
  };

  const updateActiveAccount = (accountInfo) => {
    setActiveAccount(accountInfo);
  }

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

  const updateShipMethod = (e) => {
    const method = e.target.value;
    const methodInfo = shipMethods.find(type => type.key === method);


    if (method === "standard" && shipCost === 5) {
      setTotals({
        ...totals,
        shipCost: 0,
        total: total - 5,
      });
    } else if (method === "express") {
      setTotals({
        ...totals,
        shipCost: 5,
        total: total + 5,
      });
    }
    setShipMethod(methodInfo);
  };

  const updateShipFormValues = (e) => {
    const { name, value } = e.target;
    const { valid, error } = validateValues(name, value);

    if (valid) {
      setShipFormValues({
        ...shipFormValues,
        [name]: value,
      });
    }

    setShipFormErrors({
      ...shipFormErrors,
      [name]: error,
    });
  };

  return (
    <div id="CodeCommerceApp">
      {page === "signLog" && (
        <SignUpLogin
          updateActive={updateActiveAccount}
          pageSet={changePage} 
        />
      )}

      {page !== "signLog" && (
        <div className="page-container">
          {(page === "cart" && 
            <Cart
              bag={bag}
              itemTotals={items}
              updateBag={updateBag}
              updateDisabled={updateDisabled}
              updateQty={updateBagQty}
              updateTotals={updateTotals}
            />
          )} 
          
          {(page === "ship" || page === "pay") &&
            <div className="page-status">
              <StatusBar progress={barProgress} />
              {page === "ship" && 
                <Shipping
                  errors={shipFormErrors}
                  form={shipFormValues}
                  method={shipMethod}
                  checkFullForm={checkFullForm}
                  updateMethod={updateShipMethod}
                  updateVals={updateShipFormValues}
                  goBack={changePageBack}
                />
              }
              {page === "pay" &&
                <Payment />
              }
             
            </div>
          }
          <Summary
            account={activeAccount}
            addressInfo={shipFormValues}
            bag={bag}
            discount={discount}
            page={page}
            itemTotals={items}
            shipCost={shipCost}
            shipMethod={shipMethod}
            sub={subtotal}
            total={total}
            checkout={checkout}
            disabled={disabled}
          />
        </div>
      )}

      {page === "confirm" && <Confirmation />}
    </div>
  );
};

export default CodeCommerceApp;
