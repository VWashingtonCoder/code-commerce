import "./Shipping.css";
import { cities, phoneData, shipMethods } from "../../data";

const Shipping = ({ form, updateVals }) => {
  const { 
    addressTitle, 
    name, 
    street, 
    zip, 
    country, 
    city,
    state,
    cellCode,
    cellNum, 
    telCode,
    telNum, 
    method 
  } = form;
  
  



  return (
    <div id="Shipping">
      <form className="table-view">
        <h2 className="underline-border form-title">Shipping Information</h2>
        <div className="ship-address-group underline-border">
          <div className="input-bar flex-align-center">
            <label htmlFor="addressTitle" className="first-label">Address Title</label>
            <input 
              id="addressTitle"
              name="addressTitle" 
              type="text"
              value={addressTitle}
              onChange={updateVals} 
            />
          </div>

          <div className="input-bar flex-align-center">
            <label htmlFor="name" className="first-label">Name - Surname</label>
            <input 
              id="name" 
              name="name"
              type="text"
              value={name} 
              onChange={updateVals} 
            />
          </div>

          <div className="input-bar flex-align-center">
            <label htmlFor="street" className="first-label">Your Address</label>
            <input 
              id="street"
              name="street" 
              type="text" 
              value={street}
              onChange={updateVals}
            />
          </div>

          <div className="input-bar group flex-align-center">
            <div className="input-group zip">
              <label htmlFor="zip" className="first-label">Zip Code</label>
              <input
                id="zip"
                name="zip"
                type="text"
                value={zip}
                pattern="[0-9]*"
                maxLength={5}
                onChange={updateVals}
              />
            </div>
            <div className="input-group country">
              <label htmlFor="country">Country</label>
              <select 
                id="country"
                name="country" 
                value={country}
                onChange={updateVals}
              >
                <option value="">Select</option>
                <option value="USA">United States</option>
              </select>
            </div>
            <div className="input-group city">
              <label htmlFor="city">City</label>
              <select 
                id="city" 
                name="city"
                value={city}
                onChange={updateVals}
              >
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
              <select 
                id="state"
                name="state"
                value={state}
                onChange={updateVals}
              >
                <option value="">Select</option>
                <option value="CO">CO</option>
              </select>
            </div>
          </div>
          
          {phoneData.map((phone) => {
            const { key, label } = phone;
            return (
              <div 
                className="input-bar flex-align-center" 
                key={key}
              >
                <span className="phone-label first-label">
                  {label}
                </span>
                <div className="phone-code-input">
                  <label htmlFor={`${key}Code`}>+1</label>
                  <input
                    type="tel"
                    id={`${key}Code`}
                    name={`${key}Code`}
                    value={key === "cell" ? cellCode : telCode}
                    onChange={updateVals}
                    pattern="[0-9]{3}"
                    maxLength={3}
                  />
                </div>
                <input
                  type="tel"
                  id={`${key}Num`}
                  name={`${key}Num`}
                  value={key === "cell" ? cellNum : telNum}
                  onChange={updateVals}
                  pattern={"[0-9]{3}-[0-9]{4}" || "[0-9]{7}"}
                  maxLength={7}
                />
              </div>
            )
          })}
        </div>

        <div className="ship-method-group">
          <h2 className="method-title">Shipping Method</h2>
          {shipMethods.map((type) => {
            const { key, info } = type;
            return (
              <div className="radio-row" key={key} value={method}>
                <input 
                  type="radio" 
                  name="method" 
                  id={key} 
                  value={key} 
                  onChange={updateVals}
                />
                <span className="label-key">{key}</span>
                <span className="label-info">{info}</span>
              </div>
            );
          })}
        </div>

        <button className="back-btn">Back To Cart</button>
      </form>
    </div>
  );
};

export default Shipping;
