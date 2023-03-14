import "./Shipping.css";

const cities = {
  COS: "Colorado Springs",
  DEN: "Denver",
  PUE: "Pueblo",
};

const shipMethods = [
    { 
        key: "standard",
        info: "Delivery in 4-6 Business Days - Free" 
    },
    { 
        key: "express",  
        info: "Delivery in 1-3 Business Days - $5.00" 
    }
]

const Shipping = () => {
  return (
    <div id="Shipping">
      <h2>Shipping Information</h2>

      <form>
        <div className="input-bar">
          <label htmlFor="address-title">Address Title</label>
          <input id="address-title" name="address-title" type="text" />
        </div>
        
        <div className="input-bar">
          <label htmlFor="name">Name - Surname</label>
          <input id="name" name="name" type="text" />
        </div>
        
        <div className="input-bar">
          <label htmlFor="street">Your Address</label>
          <input id="street" name="street" type="text" />
        </div>
        
        <div className="input-bar">
          <div className="input-group zip">
            <label htmlFor="zip">Zip Code</label>
            <input
              id="zip"
              name="zip"
              type="text"
              pattern="[0-9]*"
              maxLength={5}
            />
          </div>
          <div className="input-group country">
            <label htmlFor="country">Country</label>
            <select id="country" name="country">
              <option value="">Select</option>
              <option value="USA">United States</option>
            </select>
          </div>
          <div className="input-group city">
            <label htmlFor="city">City</label>
            <select id="city" name="city">
              <option value="">Select</option>
              {Object.entries(cities).map((city) => {
                const [key, val] = city;
                return (
                  <option key={key} value={key}>
                    {val}
                  </option>
                );
              })}
              ;
            </select>
          </div>
          <div className="input-group state">
            <label htmlFor="state">State</label>
            <select name="state" id="state">
                <option value="">Select</option>
                <option value="CO">CO</option>
            </select>
          </div>
        </div>

        {["Cell Phone", "Telephone"].map((label, idx) => (
            <div className="input-bar" key={`phone-${idx}`}>
                <span className="phone-label">{label}</span>
                <div className="phone-code-input">
                    <label htmlFor="phone-code">+1</label>
                    <input 
                        type="tel" 
                        name="phone-code" 
                        className="phone-code" 
                        pattern="[0-9]{3}"
                    />
                </div>
                <input 
                    type="tel" 
                    name={label === "Cell Phone" ? "cell-phone" : "telephone"} 
                    className="phone-num" 
                    pattern="[0-9]{3}-[0-9]{4} || [0-9]{7}" 
                />
            </div>
        ))}

        <div className="ship-method-group">
            <h2>Shipping Method</h2>
            {shipMethods.map(method => {
                const { key, info } = method;
                return (
                    <div className="radio-row" key={key}>
                        <input 
                            type="radio" 
                            name="ship-method" 
                            id={key}
                            value={key}  
                        />
                        <span className="label-key">{key}</span>
                        <span className="label-info">{info}</span>
                    </div>
                );
            })}
        </div>
      </form>

      <button className="back-btn">
        Back To Cart
      </button>
    </div>
  );
};

export default Shipping;
