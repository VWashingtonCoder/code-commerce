import { useState } from "react";
import "./Cart.css";
import StatusBar from "./StatusBar";
import Table from "./Table";
import Summary from "./Summary";
import { productsInfo, productsStates } from "./data";

const Cart = ({ pageSet, final }) => {
  const [status, setStatus] = useState({ top: "", item: "" });
  const [cartItems, setCartItems] = useState(productsInfo);
  const [cartStates, setCartStates] = useState(productsStates);
  const [totals, setTotals] = useState({ sub: 72.75, total: 72.75 });
  const { top, item } = status;
  const { sub, total } = totals;

  function getSubTotal(key, total) {
    let subtotal = 0;
    for (let entry in cartStates) {
      if (entry === key) subtotal = subtotal + total;
      else subtotal = subtotal + cartStates[entry].totalPrice; 
    }
    return subtotal;
  }

  const updateQuantityPrice = (e) => {
    const value = Number(e.target.value);
    const itemKey = e.target.name;
    const item = productsInfo.find((item) => item.key === itemKey);
    const price = item.price;
    const newTotal = price * value;
    const subtotal = getSubTotal(itemKey, newTotal);

    setCartStates({
      ...cartStates,
      [itemKey]: { quantity: value, totalPrice: newTotal },
    });
    setTotals({ sub: subtotal, total: subtotal });
  };

  const removeItem = (e) => {
    e.preventDefault();
    const key = e.target.value;
    const newCart = cartItems.filter(item => item.key !== key);
    const item = cartItems.find(item => item.key === key);
    const name = item.itemName
    const quantity = cartStates[key].quantity
    const subtotal = getSubTotal(key, 0)
 
    setCartItems(newCart)
    setCartStates({
      ...cartStates,
      [key]: { quantity: 0, totalPrice: 0 },
    });
    setTotals({ sub: subtotal, total: subtotal });
    setStatus({ top: `${quantity} items removed:`, item: name })
  }

  const checkout = (e) => {
    e.preventDefault();
    const cartInfo = {
      cart: [],
      subtotal: sub
    }

    cartItems.forEach(item => {
      const { key } = item;
      const cartItem = { ...item, quantity: cartStates[key].quantity}
      cartInfo["cart"].push(cartItem);
    })

    final(cartInfo);
    pageSet("ship");
  }

  return (
    <div id="Cart">
      <div className="cart-info">
        {top && (<StatusBar top={top} item={item} />)}
        <Table cart={cartItems} states={cartStates} remove={removeItem} update={updateQuantityPrice}/>
      </div>
      <Summary sub={sub} total={total} checkout={checkout} />
    </div>
  );
};

export default Cart;
