import { useState } from "react";
import "./Cart.css";
import StatusBar from "./StatusBar";
import Table from "./Table";


const Cart = () => {
  const [status, setStatus] = useState("1 out of stock item removed");
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  return (
    <div id="Cart">
      <div className="cart-info">
        {status && (<StatusBar status={status} />)}
        
        <Table />
{/* 
        <table className="cart-table">
          <tr className="cart-table-head">
            <th></th>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total Price</th>
          </tr>


          {products.map((item, idx) => {
            const { imgSrc, category, itemName, color, size, price } = item;

            const key = idx + 1;

            return (
              <tr className="product-row" key={key}>
                <td className="product-btn-row">
                  <button className="product-btn">
                    <AiFillCloseCircle />
                  </button>
                </td>
                <td className="product-info-row">
                  <ProductInfo
                    img={imgSrc}
                    category={category}
                    name={itemName}
                    color={color}
                    size={size}
                  />
                </td>
                <td className="product-price-row">{`$${price.toFixed(2)}`}</td>
                <td className="product-quantity-row">
                  <select name={`quantity-${key}`} className="product-quantity">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option value={num}>{num}</option>
                    ))}
                  </select>
                </td>
                <td className="product-total-row">
                  {/* have to hook up a function to return total price of items 
                  {price.toFixed(2)}
                </td>
              </tr>
            );
          })}
        </table> */}
      </div>
      <div className="cart-summary">
        <div className="summary-title">Summary</div>
        <div className="promo">
          <label htmlFor="promo-code">Do you have a promo code?</label>
          <input type="text" name="promo-code" placeholder="Code" />
          <button className="promo-apply-btn">Apply</button>
        </div>
        <div className="cart-totals">
          <div className="cart-subtotal totals-container">
            <p className="total-title">Cart Subtotal:</p>
            <p className="total-num">
              {subtotal === 0 ? "-" : `$${subtotal.toFixed(2)}`}
            </p>
          </div>
          <div className="cart-shipping totals-container">
            <p className="total-title">Shipping & Handling:</p>
            <p className="total-num">-</p>
          </div>
          <div className="cart-shipping totals-container">
            <p className="total-title">Discount:</p>
            <p className="total-num">-</p>
          </div>
          <div className="cart-total totals-container">
            <p className="total-title">Cart Total:</p>
            <p className="total-num">
              {total === 0 ? "-" : `$${total.toFixed(2)}`}
            </p>
          </div>
        </div>
        <button className="checkout-btn">Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
