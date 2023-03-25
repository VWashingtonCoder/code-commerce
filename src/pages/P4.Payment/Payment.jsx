import "./Payment.css";
import { monthOptions, yearOptions } from "../../data-helpers/data";
import { validateValues } from "../../data-helpers/helpers";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { useEffect, useState } from "react";

const initCardForm = {
  cardName: "",
  cardNum: "",
  expMonth: "",
  expYear: "",
  cvv: ""
}

const errorKeys = ["cardName", "cardNum", "expMonth", "expYear", "cvv"];

const Payment = ({ updateDisabled }) => {
  const [cardValues, setCardValues] = useState(initCardForm);
  const [errors, setErrors] = useState({});

  const updateCardValues = (e) => {
    const { id, value } = e.target;
    const { valid, error } = validateValues(id, value);
    if (valid) setCardValues({ ...cardValues, [id]: value });
    setErrors({ ...errors, [id]: error });
  }

  useEffect(() => {
    const cardVals = Object.values(cardValues);
    const errorVals = Object.values(errors);

    if (!cardVals.includes("") && !errorVals) updateDisabled();
  })

  return (
    <div id="Payment">
      <h2 className="underline-border">Payment Information</h2>
      {errors && (
        <div className="errors-box">
          {errorKeys.map(key => (
            <p key={key} className="error-text">{errors[key]}</p>
          ))}
        </div>
      )}
      <div className="pay-inputs-container">
        <div className="pay-row name">
          <label htmlFor="cardName">Cardholder Name</label>
          <input 
            type="text" 
            id="cardName" 
            value={cardValues.cardName} 
            onChange={updateCardValues} 
          />
        </div>
        <div className="pay-row num">
          <label htmlFor="cardNum">Card Number</label>
          <input 
            type="text" 
            id="cardNum"
            value={cardValues.cardNum} 
            onChange={updateCardValues}  
          />
        </div>
        <div className="pay-row exp">
          <span className="exp-label">Exp Date</span>
          <select 
            id="expMonth"
            value={cardValues.expMonth} 
            onChange={updateCardValues} 
          >
            {monthOptions.map((month) => {
              const { key, text, value } = month;
              return (
                <option key={key} value={value} className="month-opt">
                  {text}
                </option>
              );
            })}
          </select>
          <select 
            id="expYear"
            value={cardValues.expYear} 
            onChange={updateCardValues} 
          >
            <option value="">Year</option>
            {yearOptions().map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="pay-row cvv flex-align-center">
          <label htmlFor="cvv">CVV</label>
          <input 
            type="text" 
            id="cvv"
            value={cardValues.cvv} 
            onChange={updateCardValues}  
          />
          <AiOutlineQuestionCircle className="question-circle" />
        </div>
      </div>
      <button className="back-btn">Back To Cart</button>
    </div>
  );
};

export default Payment;
