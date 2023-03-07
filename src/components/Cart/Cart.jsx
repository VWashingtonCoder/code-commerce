import { useState } from "react";
import "./Cart.css";
import { headers, categories, qtyOptions } from "../data";
import Table from "./Table";
import { AiFillCloseCircle } from "react-icons/ai";

const Cart = (props) => {
  const { bag, pageSet, final, updateTotals, updateDisabled } = props;
  const [status, setStatus] = useState("");
  const [statusItem, setStatusItem] = useState("");

  const updateQuantityPrice = (e) => {
    const value = Number(e.target.value);
    const itemKey = e.target.name;
    const item = bag.find((item) => item.key === itemKey);
    const price = item.price;
    const newTotal = price * value;
  };

  // const removeItem = (e) => {
  //   e.preventDefault();
  //   const key = e.target.value;
  //   const newCart = cartItems.filter(item => item.key !== key);
  //   const item = cartItems.find(item => item.key === key);
  //   const name = item.itemName
  //   const quantity = cartStates[key].quantity
  //   const subtotal = getSubTotal(key, 0)

  //   setCartItems(newCart)
  //   setCartStates({
  //     ...cartStates,
  //     [key]: { quantity: 0, totalPrice: 0 },
  //   });
  //   setStatus(`${quantity} items removed:`);
  //   setStatusItem(name);
  //   updateTotals(subtotal);

  //   if (cartItems.length <= 1) updateDisabled();
  // }

  // const checkout = (e) => {
  //   e.preventDefault();
  //   const cartInfo = {
  //     cart: [],
  //   }

  //   cartItems.forEach(item => {
  //     const { key } = item;
  //     const cartItem = { ...item, quantity: cartStates[key].quantity}
  //     cartInfo["cart"].push(cartItem);
  //   })

  //   final(cartInfo);
  //   pageSet();
  // }

  return (
    <div id="Cart">
      {status && (
        <div className="status-bar">
          <button className="close-x icon-btn">X</button>
          <div className="img-container">
            <img
              src="https://cdn-icons-png.flaticon.com/512/6745/6745042.png"
              alt="hazard sign"
            />
          </div>
          <div className="text-container">
            <p className="text-status">{status}</p>
            <p className="text-item">{statusItem}</p>
          </div>
        </div>
      )}




      <table className="cart-table">
        <thead>
          <tr className="cart-table-head">
            {headers.map((head, idx) => (
              <th
                key={`head-${idx}`}
                className={`${head !== " " ? `${head}-row` : "close-row"} t-head underline-border`}
              >
                {head}
              </th>
            ))}
          </tr>
        </thead>
      </table>

      <tbody>
        {bag.map((item) => {
          const {
            category,
            color,
            imgSrc,
            itemName,
            key,
            price,
            size,
            totalPrice,
          } = item;

          return (
            <tr className="item-row" key={key}>
              <td className="product-column remove underline-border close-row">
                <button className="product-btn icon-btn"  value={key}>
                  <AiFillCloseCircle className="remove-x" />
                </button>
              </td>

              <td className="product-column item underline-border">
                <div className="product-info flex-align-center">
                  <div className="img-container">
                    <img src={imgSrc} alt={`${itemName} display`} />
                  </div>
                  <div className="text-container">
                    <p className="category-text">{category}</p>
                    <p className="name-text">{itemName}</p>
                    {categories.map((info) => (
                      <div className="info-container flex-align-center">
                        <p className="text-label">{info}:</p>
                        <p className="text-value">
                          {info === "color" ? color : size}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </td>
            </tr>
          );
          // return (
          //   <tr className="product-row" key={key}>
          //     <td className="product-column remove underline-border">
          //       <button className="product-btn icon-btn" value={key}>
          //         <AiFillCloseCircle className="remove-x" />
          //       </button>
          //     </td>

          //     <td className="product-column item underline-border">
          //       <div className="product-info flex-align-center">
          //         <div className="img-container">
          //           <img src={imgSrc} alt={`${itemName} display`} /
          //         </div>
          //         <div className="text-container">
          //           <p className="category-text">{category}</p>
          //           <p className="name-text">{itemName}</p>
          //           {categories.map((info) => (
          //             <div className="info-container flex-align-center">
          //               <p className="text-label">{info}:</p>
          //               <p className="text-value">{info === "color" ? color : size}</p>
          //             </div>
          //           ))}
          //         </div>
          //       </div>
          //     </td>

          //     <td className="product-column price underline-border">
          //       {`$${price.toFixed(2)}`}
          //     </td>

          //     <td className="product-column quantity underline-border">
          //       <select
          //         name={key}
          //         className="product-quantity"
          //         onChange={updateQuantityPrice}
          //       >
          //         {qtyOptions.map((num, idx) => (
          //           <option key={idx} value={num}>{num}</option>
          //         ))}
          //       </select>
          //     </td>

          //     <td className="product-column total underline-border">
          //       {`$${totalPrice.toFixed(2)}`}
          //     </td>
          //   </tr>
          // );
        })}
      </tbody>

      {/* <Table 
          cart={bag} 
          // remove={removeItem} 
          update={updateQuantityPrice}
        /> */}
    </div>
  );
};

export default Cart;
