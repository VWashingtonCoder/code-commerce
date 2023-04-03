import { useState } from "react";
import "./CodeCommerceApp.css";
import {
  pageKeys,
  initBag,
  initTotals,
  initBarProgress,
  shipMethods
} from "./data-helpers/data";
import SignUpLogin from "./pages/P1.SignupLogin/SignupLogin";
import Cart from "./pages/P2.Cart/Cart";
import Shipping from "./pages/P3.Shipping/Shipping";
import Payment from "./pages/P4.Payment/Payment";
import Confirmation from "./pages/P5.Confirmation/Confirmation";
import StatusBar from "./components/StatusBar/StatusBar";
import Summary from "./components/Summary/Summary";

const CodeCommerceApp = () => {
  //Global
  const [page, setPage] = useState(pageKeys[0]);  
  const [barProgress, setBarProgress] = useState(initBarProgress);
  // SignUpLogin
  const [activeAccount, setActiveAccount] = useState({});
  // Summary
  const [disabled, setDisabled] = useState(false); 
  const [totals, setTotals] = useState(initTotals); // init: initTotals
  const { 
    items, 
    subtotal, 
    shipCost, 
    discount, 
    total 
  } = totals;
  // Cart
  const [bag, setBag] = useState(initBag);
  // Shipping
  const [shipInfo, setShipInfo] = useState({}); 
  // Pay
  const [payCard, setPayCard] = useState({}); 

  const resetToInits = () => {
    setBarProgress(initBarProgress);
    setDisabled(false);
    setTotals(initTotals);
    setBag(initBag);
    setShipInfo({});
    setPayCard({});
  }

  const changePage = () => {
    const pageIdx = pageKeys.findIndex((key) => key === page);
    if (page === "confirm"){
      setPage(pageKeys[1]);
      resetToInits();
    } else setPage(pageKeys[pageIdx + 1]) 
  };

  const changePageBack = () => {
    const pageIdx = pageKeys.findIndex((key) => key === page);
    setPage(pageKeys[pageIdx - 1]);

    if (page === "ship") {
      setDisabled(false);
      setTotals({ ...totals, discount: 0, total: total + discount });
    } else if (page === "pay") {
      setDisabled(true);
      setBarProgress({ ...barProgress, ship: false })
    }
  };

  const checkout = () => {
    if (page === "cart") {
      setTotals({
        ...totals,
        discount: discount === 0 ? 4.5 : discount,
        total: total - 4.5,
      });
    } else if (page === "ship" || page === "pay") {
      setBarProgress({ ...barProgress, [page]: true });
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

  const updatePayCard = (cardData) => {
    setPayCard(cardData);
  }

  const updateCartTotals = (itemTotals) => {
    let sub = 0;
    const itemTotalsArr = Object.values(itemTotals);
    itemTotalsArr.forEach((total) => (sub = sub + total));
    setTotals({
      ...totals,
      items: itemTotals,
      subtotal: sub,
      total: sub,
    });
  };

  const updateShipInfo = (shipInfo) => {
    setShipInfo(shipInfo);
  }

  const updateShipTotals = (cost) => {
    setTotals({ 
      ...totals, 
      shipCost: cost,
      total: cost < shipCost ? total - shipCost : total + cost
    });
  }

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
              updateTotals={updateCartTotals}
            />
          )} 
          
          {(page !== "cart") &&
            <div className="page-status">
              <StatusBar progress={barProgress} />
              <div className="page-container">
                {page === "ship" && 
                  <Shipping
                    disabled={disabled}
                    updateDisabled={updateDisabled}
                    updateTotals={updateShipTotals}
                    sendShipInfo={updateShipInfo} 
                    goBack={changePageBack}
                  />
                }
                {page === "pay" &&
                  <Payment 
                    disabled={disabled}
                    updateDisabled={updateDisabled} 
                    sendCardData={updatePayCard}
                    goBack={changePageBack}
                  />
                }
                {page === "confirm" && (
                  <Confirmation shipInfo={shipInfo} backToCart={changePage}/>
                )}
              </div>
            </div>
          }      

          <Summary
                  account={activeAccount}
                  addressInfo={shipInfo.addressData}
                  bag={bag}
                  discount={discount}
                  page={page}
                  payCard={payCard}
                  itemTotals={items}
                  shipCost={shipCost}
                  shipMethod={shipInfo.methodData}
                  sub={subtotal}
                  total={total}
                  checkout={checkout}
                  disabled={disabled}
                />
              
        </div>
      )}      
    </div>
  );
};

export default CodeCommerceApp;
