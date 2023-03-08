import { useState } from "react";
import "./Cart.css";
import { 
  headers, 
  categories, 
  qtyOptions,
  productsInfo,
  productsQuantities, 
  productsTotals 
} from "../data";
import { AiOutlineClose, AiFillCloseCircle } from "react-icons/ai";

const Cart = (props) => {
  const { 
    bag, 
    updateTotals,
    // pageSet, 
    // final, 
     
    updateDisabled 
  } = props;
  const [status, setStatus] = useState({ message: "", item: "" });
  const [cartItems, setCartItems] = useState(productsInfo);
  const [removedItems, setRemovedItems] = useState([]);
  const [quantities, setQuantities] = useState(productsQuantities);
  const [totals, setTotals] = useState(productsTotals);

  const updateStatus = (act, val, item) => {
    let message = "";
    console.log(act, val, item);
    switch(act) {
      case "add": 
        message = `${val} item(s) added to cart:`;
        break;
      case "minus":
        message = `${val} item(s) removed from cart:`
        break;
      default:
        break;
    }
    setStatus({ message: message, item: item });
  }

  const closeStatus = (e) => {
    console.log(e.target)
    setStatus({ message: "", item: "" });
  }

  const removeItem = () => {
    const newCart = cartItems.filter(item => item.key !== name);

    console.log(newCart);
       // // if (value === "0") {
      // const newCart = cartItems.filter(item => item.key !== name);
      // if (newCart.length <= 0) updateDisabled();
      // setCartItems(newCart);
      // setRemovedItems(item);
      // createStatus("remove");
    // } 
  }

  const updateQtyTotal = (e) => {
    const { name, value } = e.target;
    const newQty = Number(value);
    const item = cartItems.find((item) => item.key === name);
    const { itemName, price, key } = item;
    const itemTotal = price * newQty;
    const newTotals = { ...totals, [key]: itemTotal };
    const newTotalsArr = Object.values(newTotals);
    
    if (newQty > quantities[key]) 
      updateStatus('add', (newQty - quantities[key]), itemName);
    else if (newQty < quantities[key] && newQty > 0)
      updateStatus('minus', (quantities[key] - newQty), itemName);
    else if (newQty === 0) {
      updateStatus('minus', quantities[key], itemName);
      //run removeitems function
    }

    // // if (value === "0") {
      // const newCart = cartItems.filter(item => item.key !== name);
      // if (newCart.length <= 0) updateDisabled();
      // setCartItems(newCart);
      // setRemovedItems(item);
      // createStatus("remove");
    // } else createStatus("update", value);

    // setQuantities({ ...quantities, [name]: Number(value) });
    // setTotals(newTotals);
    // updateTotals(newTotalsArr);    
  }

  // const removeItem = (e) => {
  //   e.preventDefault();
  //   const { name, value } = e.target;

  //   console.log(name, value)
    
    // const { value } = e.target;
    // const newCart = cartItems.filter(item => item.key !== value);
    // const newTotals = { ...totals, [value]: 0 };
    // const newTotalsArr = Object.values(newTotals);
    // console.log(newCart);

    // setCartItems(newCart);
    // setQuantities({ ...quantities, [value]: 0 });
    // setTotals(newTotals)
    // updateTotals(newTotalsArr)
  
  }


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
      {status.message && (
        <div className="status-bar flex-align-center">
          <button className="close-x icon-btn" onClick={closeStatus}>
            <AiOutlineClose className="x-icon"/>
          </button>
          <div className="img-container">
            <img
              src="https://cdn-icons-png.flaticon.com/512/6745/6745042.png"
              alt="hazard sign"
            />
          </div>
          <div className="text-container">
            <p className="status-text">{status.message}</p>
            <p className="status-item">{status.item}</p>
          </div>
        </div>
      )}

      <table className="cart-table">
        <thead>
          <tr className="cart-table-head">
            {headers.map((head, idx) => (
              <th
                key={`head-${idx}`}
                className={`${
                  head !== " " ? `${head}-column` : "close-column"
                } t-head underline-border`}
              >
                {head}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {cartItems.map((item) => {
            const {
              category,
              color,
              imgSrc,
              itemName,
              key,
              price,
              size,
            } = item;
            const totalPrice = totals[key];

            return (
              <tr className="item-row" key={key}>
                <td className="close-column underline-border">
                  <button 
                    className="remove-btn icon-btn" 
                    name={key}
                    value="0"
                    onClick={updateQtyTotal}
                  >
                    <AiFillCloseCircle className="x-icon" />
                  </button>
                </td>

                <td className="product-column underline-border">
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

                <td className="price-column underline-border">
                        <p className="price-text">{`$${price.toFixed(2)}`}</p>
                </td>

                <td className="quantity-column underline-border">
                  <select
                    name={key}
                    className="quantity-select"
                    onChange={updateQtyTotal}
                  >
                    {qtyOptions.map((num, idx) => (
                      <option key={idx} value={num}>{num}</option>
                    ))}
                  </select>
                </td>

                <td className="total-column underline-border">
                  <p className="total-text">{`$${totalPrice.toFixed(2)}`}</p>
                </td>

              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};





//   </tr>
// );

export default Cart;
