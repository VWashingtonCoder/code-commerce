import "./Summary.css";

const Summary = (props) => {
  const { 
    bag, 
    discount, 
    page, 
    itemTotals,
    shipCost,
    sub, 
    total, 
    checkout, 
    disabled 
  } = props;
  const { bagItems, quantities } = bag;

  return (
    <div id="Summary">
      <h2 className="summary-title underline-border">Summary</h2>
      {page === "cart" && (
        <div className="promo underline-border">
          <label htmlFor="promo-code">Do you have a promo code?</label>
          <div className="input-row flex-align-center">
            <input type="text" name="promo-code" placeholder="Code" />
            <button className="promo-apply-btn">Apply</button>
          </div>
        </div>
      )}
      {(page === "ship" || page=== "pay") && (
        <div className="bag-summary">
          <div className="bag-items-num underline-border">
            <p className="bag-num">
              <span>{bagItems.length} items</span> in your bag
            </p>
          </div>
          <div className="bag-items-summary underline-border">
            {bagItems.map(item => {
              const {
                color,
                imgSrc,
                key,
                size
              } = item;

              return(
                <div className="bag-item" key={key}>
                  <div className="item-img">
                    <img src={imgSrc} alt="product" />
                  </div>
                  <div className="item-text">
                    <p className="item-name">Anime Print Hoodie</p>
                    <div className="item-description-container">
                      <p className="item-description">  
                        Color: <span>{color}</span>
                      </p>
                      <p className="item-description">
                        Size: <span>{size}</span>
                      </p>
                      <p className="item-description">
                        Qty: 
                        <span>{quantities[key]}</span> 
                        <span className="item-total">${itemTotals[key].toFixed(2)}</span>
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <div className="cart-totals underline-border">
        <div className="cart-subtotal totals-container flex-align-center">
          <p className="total-title">Cart Subtotal:</p>
          <p className="total-num">{sub === 0 ? "-" : `$${sub.toFixed(2)}`}</p>
        </div>
        <div className="cart-shipping totals-container flex-align-center">
          <p className="total-title">Shipping & Handling:</p>
          <p className="total-num">{shipCost === 0 ? "-" : `$${shipCost.toFixed(2)}`}</p>
        </div>
        <div className="cart-shipping totals-container flex-align-center">
          <p className="total-title">Discount:</p>
          <p className="total-num discount">
            {discount === 0 ? "-" : `-$${discount.toFixed(2)}`}
          </p>
        </div>
        <div className="cart-total totals-container flex-align-center">
          <p className="total-title">Cart Total:</p>
          <p className="total-num">
            {total === 0 ? "-" : `$${total.toFixed(2)}`}
          </p>
        </div>
      </div>
      <button className="checkout-btn" onClick={checkout} disabled={disabled}>
        Checkout
      </button>
    </div>
  );
};

export default Summary;
