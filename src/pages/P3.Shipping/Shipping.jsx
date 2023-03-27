import "./Shipping.css";
import { cities, initShipFormValues, phoneData, shipMethods } from "../../data-helpers/data";
import { validateShipValues } from "../../data-helpers/validation";
import { useEffect, useState } from "react";

const Shipping = (props) => {
  const {
    disabled,
    updateDisabled,
    updateInfo,
    updateTotals,
    goBack,
  } = props;
  const [shipFormValues, setShipFormValues] = useState(initShipFormValues);
  const [shipFormErrors, setShipFormErrors] = useState({});
  const [shipMethod, setShipMethod] = useState(shipMethods[0].key);
  
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
  } = shipFormValues;

  const checkFullForm = () => {
    const requiredArr = Object.entries(shipFormValues).filter(key => 
      key[0] !== "addressTitle" 
      && key[0] !== "cellCode"
      && key[0] !== "cellNum"
      && key[0] !== "telCode"
      && key[0] !== "telNum" 
    );
    const requiredObj = requiredArr.reduce((obj, data) => ({ ...obj, [data[0]]: data[1] }), {});
    const methodInfo = shipMethods.find(type => type.key === shipMethod);
    const shipmentInfo = {
      addressData: requiredObj,
      methodData: { method: methodInfo.key, info: methodInfo.info }
    }

    if (
      (!requiredArr.includes("") && disabled === true) ||
      (requiredArr.includes("") && disabled === false)
    ) { 
      updateDisabled(!disabled);
      updateInfo(shipmentInfo);
    }
    
  };

  const updateShipFormValues = (e) => {
    const { name, value } = e.target;
    const { valid, error } = validateShipValues(name, value);

    if (valid) {
      setShipFormValues({
        ...shipFormValues,
        [name]: value,
      });
    }

    setShipFormErrors({
      ...shipFormErrors,
      [name]: error,
    });
  };

  const updateShipMethod = (e) => {
    const method = e.target.value;
    const methodCost = shipMethods.find(type => type.key === method).cost;
    setShipMethod(method);
    updateTotals(methodCost)
  };

  const errorActive = Object.values(shipFormErrors).some((entry) =>
    entry.includes("*")
  );

  useEffect(() => {
    checkFullForm();
  });

  return (
    <div id="Shipping">
      <form className="table-view" autoComplete="off">
        <h2 className="underline-border form-title">Shipping Information</h2>

        {errorActive && (
          <div className="error-box">
            {Object.values(shipFormErrors).map((error) => (
              <p className="error-text">{error}</p>
            ))}
          </div>
        )}

        <div className="ship-address-group underline-border">
          <div className="input-bar flex-align-center">
            <label htmlFor="addressTitle" className="first-label">
              Address Title 
            </label>
            <input
              id="addressTitle"
              name="addressTitle"
              type="text"
              value={addressTitle}
              onChange={updateShipFormValues}
            />
          </div>

          <div className="input-bar flex-align-center">
            <label htmlFor="name" className="first-label">
              Name - Surname *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={updateShipFormValues}
              required
            />
          </div>

          <div className="input-bar flex-align-center">
            <label htmlFor="street" className="first-label">
              Your Address *
            </label>
            <input
              id="street"
              name="street"
              type="text"
              value={street}
              onChange={updateShipFormValues}
              required
            />
          </div>

          <div className="input-bar group flex-align-center">
            <div className="input-group zip">
              <label htmlFor="zip" className="first-label">
                Zip Code *
              </label>
              <input
                id="zip"
                name="zip"
                type="text"
                value={zip}
                pattern="[0-9]*"
                maxLength={5}
                onChange={updateShipFormValues}
                required
              />
            </div>
            <div className="input-group country">
              <label htmlFor="country">Country *</label>
              <select
                id="country"
                name="country"
                value={country}
                onChange={updateShipFormValues}
                required
              >
                <option value="">Select</option>
                <option value="USA">United States</option>
              </select>
            </div>
            <div className="input-group city">
              <label htmlFor="city">City *</label>
              <select 
                id="city" 
                name="city" 
                value={city} 
                onChange={updateShipFormValues} 
                required
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
              <label htmlFor="state">State *</label>
              <select
                id="state"
                name="state"
                value={state}
                onChange={updateShipFormValues}
                required
              >
                <option value="">Select</option>
                <option value="CO">CO</option>
              </select>
            </div>
          </div>

          {phoneData.map((phone) => {
            const { key, label } = phone;
            return (
              <div className="input-bar flex-align-center" key={key}>
                <span className="phone-label first-label">{label}</span>
                <div className="phone-code-input">
                  <label htmlFor={`${key}Code`}>+1</label>
                  <input
                    type="tel"
                    id={`${key}Code`}
                    name={`${key}Code`}
                    value={key === "cell" ? cellCode : telCode}
                    onChange={updateShipFormValues}
                    pattern="[0-9]{3}"
                    maxLength={3}
                  />
                </div>
                <input
                  type="tel"
                  id={`${key}Num`}
                  name={`${key}Num`}
                  value={key === "cell" ? cellNum : telNum}
                  onChange={updateShipFormValues}
                  pattern={"[0-9]{3}-[0-9]{4}" || "[0-9]{7}"}
                  maxLength={7}
                />
              </div>
            );
          })}
        </div>

        <div className="ship-method-group">
          <h2 className="method-title">Shipping Method</h2>
          {shipMethods.map((type) => {
            const { key, info } = type;
            return (
              <div className="radio-row" key={key} value={shipMethod}>
                <input
                  type="radio"
                  name="method"
                  id={key}
                  value={key}
                  checked={shipMethod === key}
                  onChange={updateShipMethod}
                />
                <span className="label-key">{key}</span>
                <span className="label-info">{info}</span>
              </div>
            );
          })}
        </div>

        <button className="back-btn" onClick={goBack}>
          Back To Cart
        </button>
      </form>
    </div>
  );
};

export default Shipping;
