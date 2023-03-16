import "./Shipping.css";
import { cities, phoneData, shipMethods } from "../../data";

const Shipping = () => {
  return (
    <div id="Shipping">
      <form className="table-view">
        <h2 className="underline-border form-title">Shipping Information</h2>
        <div className="ship-address-group underline-border">
          <div className="input-bar flex-align-center">
            <label htmlFor="address-title" className="first-label">Address Title</label>
            <input id="address-title" name="address-title" type="text" />
          </div>

          <div className="input-bar flex-align-center">
            <label htmlFor="name" className="first-label">Name - Surname</label>
            <input id="name" name="name" type="text" />
          </div>

          <div className="input-bar flex-align-center">
            <label htmlFor="street" className="first-label">Your Address</label>
            <input id="street" name="street" type="text" />
          </div>

          <div className="input-bar group flex-align-center">
            <div className="input-group zip">
              <label htmlFor="zip" className="first-label">Zip Code</label>
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
          
          {phoneData.map((phone) => {
            const { key, label, id } = phone;
            return (
              <div 
                className="input-bar flex-align-center" 
                key={key}
              >
                <span className="phone-label first-label">
                  {label}
                </span>
                <div className="phone-code-input">
                  <label htmlFor={`${id}Code`}>+1</label>
                  <input
                    type="tel"
                    id={`${id}Code`}
                    name="phone-code"
                    pattern="[0-9]{3}"
                    maxLength={3}
                  />
                </div>
                <input
                  type="tel"
                  name={`${key}-num`}
                  className="phone-num"
                  pattern={"[0-9]{3}-[0-9]{4}" || "[0-9]{7}"}
                  maxLength={7}
                />
              </div>
            )
          })}
        </div>

        <div className="ship-method-group">
          <h2 className="method-title">Shipping Method</h2>
          {shipMethods.map((method) => {
            const { key, info } = method;
            return (
              <div className="radio-row" key={key}>
                <input type="radio" name="ship-method" id={key} value={key} />
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
