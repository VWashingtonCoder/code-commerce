const Summary = ({ sub, total }) => {
  return (
    <div id="Summary">
      <h2 className="summary-title">Summary</h2>
      <div className="promo">
        <label htmlFor="promo-code">Do you have a promo code?</label>
        <div className="input-row flex-align-center">
          <input type="text" name="promo-code" placeholder="Code" />
          <button className="promo-apply-btn">Apply</button>
        </div>
        
      </div>
      <div className="cart-totals">
        <div className="cart-subtotal totals-container flex-align-center">
          <p className="total-title">Cart Subtotal:</p>
          <p className="total-num">{sub === 0 ? "-" : `$${sub.toFixed(2)}`}</p>
        </div>
        <div className="cart-shipping totals-container flex-align-center">
          <p className="total-title">Shipping & Handling:</p>
          <p className="total-num">-</p>
        </div>
        <div className="cart-shipping totals-container flex-align-center">
          <p className="total-title">Discount:</p>
          <p className="total-num">-</p>
        </div>
        <div className="cart-total totals-container flex-align-center">
          <p className="total-title">Cart Total:</p>
          <p className="total-num">
            {total === 0 ? "-" : `$${total.toFixed(2)}`}
          </p>
        </div>
      </div>
      <button className="checkout-btn">Checkout</button>
    </div>
  );
};

export default Summary;
