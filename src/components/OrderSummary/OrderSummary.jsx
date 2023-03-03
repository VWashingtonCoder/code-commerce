const OrderSummary = (props) => {
    const { bag, subTotal, page, ship } = props;
    return(
        <div id="OrderSummary">
            <h2 className="title">OrderSummary</h2>
            { page !== "confirm" 
                && (<p className="">{bag.length} items in your bag</p>)
            }
            <div className="bag-items">
                {bag.map((item) => {
                    const { key, imgSrc, itemName, color, size, quantity, price } = item;
                    return(
                        <div key={key} className="product flex-align-center">
                            <div className="img-container">
                                <img src={imgSrc} alt="product" />
                            </div>
                            <div className="text-container">
                                <p className="name-text">{itemName}</p>
                                <div className="info-container flex-align-center">
                                    <p className="text-label">Color:</p>
                                    <p className="text-value">{color}</p>
                                </div>
                                <div className="info-container flex-align-center">
                                    <p className="text-label">Size:</p>
                                    <p className="text-value">{size}</p>
                                </div>
                                <div className="info-container flex-align-center">
                                    <p className="text-label">Qty:</p>
                                    <p className="text-value">{quantity}</p>
                                    <p className="qty-total">{`$${(quantity * price).toFixed(2)}`}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="bag-totals">
                <div className="totals-container flex-align-center">
                    <p className="total-title">Cart Subtotal:</p>
                    <p className="total-num">${subTotal}</p>
                </div>
                <div className="totals-container flex-align-center">
                    <p className="total-title">Shipping & Handling:</p>
                    <p className="total-num">{ship <= 0 ? "-" : `$${ship.toFixed(2)}`}</p>
                </div>
                <div className="totals-container flex-align-center">
                    <p className="total-title">Discount:</p>
                    <p className="total-num">-$4.50</p>
                </div>
                <div className="totals-container flex-align-center">
                    <p className="total-title">Cart Total:</p>
                    <p className="total-num">${(subTotal - 4.50).toFixed(2)}</p>
                </div>
            </div>

            <div className="">
                <button 
                    className="checkout-btn" 
                    // onClick={checkout}
                    // disabled={disabled}
                >
                    Checkout
                </button>
            </div>
        </div>
    );
}

export default OrderSummary;