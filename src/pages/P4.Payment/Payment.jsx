import "./Payment.css";
import { monthOptions, yearOptions } from "../../data-helpers/data";
import { validateCardValues } from "../../data-helpers/validation";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { useEffect, useState } from "react";

const initCardForm = {
  cardName: "",
  cardNum: "",
  expMonth: "",
  expYear: "",
  cvv: ""
}

const cardErrorKeys = ["cardName", "cardNum", "expMonth", "expYear", "cvv"];

const Payment = ({ disabled, updateDisabled, sendCardData, goBack }) => {
  const [cardValues, setCardValues] = useState(initCardForm);
  const [errors, setErrors] = useState({});

  const checkFullCard = () => {
    const cardInfo = Object.values(cardValues);
    const errorInfo = Object.values(errors).filter(err => err !== "");


    if (!cardInfo.includes("") && errorInfo.length === 0 && disabled) {
      sendCardData(cardValues);
      updateDisabled();
    } 
    else if ((cardInfo.includes("") || errorInfo.length > 0) && !disabled){
      updateDisabled();
    }
  }

  const updateCardValues = (e) => {
    const { id, value } = e.target;
    const { valid, error } = validateCardValues(id, value);
    if (valid) setCardValues({ ...cardValues, [id]: value });
    setErrors({ ...errors, [id]: error });
  };

  useEffect(() => {
    checkFullCard();
  });

  return (
    <div id="Payment">
      <h2 className="underline-border">Payment Information</h2>
      {errors && (
        <div className="errors-box">
          {cardErrorKeys.map(key => (
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
            maxLength={4}
            onChange={updateCardValues}  
          />
          <AiOutlineQuestionCircle className="question-circle" />
        </div>
      </div>
      <button className="back-btn" onClick={goBack}>Back To Cart</button>
    </div>
  );
};

export default Payment;
