import "./Payment.css";
import { 
  initCardForm,
  cardErrorKeys, 
  monthOptions, 
  yearOptions,
  cardTypeImg
} from "../../data-helpers/data";
import { validateCardValues } from "../../data-helpers/validation";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { useEffect, useState } from "react";

const Payment = ({ disabled, updateDisabled, sendCardData, goBack }) => {
  const [cardValues, setCardValues] = useState(initCardForm);
  const { cardName, cardNum, cardType, expMonth, expYear, cvv } = cardValues;
  const [errors, setErrors] = useState({});
  const errorActive = Object.values(errors).some((entry) =>
    entry.includes("*")
  );

  function findDebitCardType(cardNumber) {
    const regexPattern = {
      MASTERCARD: /^5[1-5][0-9]{1,}|^2[2-7][0-9]{1,}$/,
      VISA: /^4[0-9]{2,}$/,
      DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
      AMERICAN_EXPRESS: /^3[47][0-9]{5,}$/
    };
    for(const card in regexPattern) {
      if (cardNumber.replace(/[^\d]/g, '').match(regexPattern[card])) return card;
    }
    return '';
  }

  const checkFullCard = () => {
    const cardInfo = Object.values(cardValues);
    const errorInfo = Object.values(errors).filter(err => err !== "");

    if (!cardInfo.includes("") && !errorInfo.length && disabled) {
      sendCardData(cardValues);
      updateDisabled();
    } else if ((cardInfo.includes("") || errorInfo.length) && !disabled){
      updateDisabled();
    }
  }

  const updateCardValues = (e) => {
    const { id, value } = e.target;
    const { valid, error } = validateCardValues(id, value);

    setErrors({ ...errors, [id]: error });

    if (id === "cardNum" && valid) {
      const cardType = findDebitCardType(value);
      let mask = ""; 
      
      if (value.length) {
        mask = value.split(" ").join("");
        if (cardType === "AMERICAN_EXPRESS") {
          if (mask.length > 6 && mask.length <= 10) 
            mask = mask.replace(/\b(\d{4})(\d{1,6})\b/, "$1 $2");
          else if (mask.length > 10) {
            mask = mask.replace(/\b(\d{4})(\d{6})(\d{1,5})\b/, "$1 $2 $3");
          } 
        } else mask = value.replace(/[^\d]/g, "").match(/.{1,4}/g).join(" "); 
      } 
      
      setCardValues({ 
        ...cardValues,
        cardNum: mask,
        cardType: cardType 
      })
    } else if (valid) {
      setCardValues({ ...cardValues, [id]: value });
    }
  };

  useEffect(() => {
    checkFullCard();
  });

  return (
    <div id="Payment">
      <h2 className="underline-border">Payment Information</h2>
      {errorActive && (
        <div className="error-box">
          {cardErrorKeys.map(key => (
            <p key={key} className="error-text">{errors[key]}</p>
          ))}
        </div>
      )}
      <div className="pay-inputs-container">
        <div className="pay-row name">
          <label htmlFor="cardName">Cardholder Name *</label>
          <input 
            type="text" 
            id="cardName" 
            value={cardName} 
            onChange={updateCardValues} 
          />
        </div>
        <div className="pay-row num">
          <label htmlFor="cardNum">Card Number *</label>
          <input 
            type="text" 
            id="cardNum"
            value={cardNum} 
            onChange={updateCardValues}  
            maxLength={cardType !== "AMERICAN_EXPRESS" ? 19 : 17}
          />
          { cardType && (
            <div className="card-img-container">
              <img src={cardTypeImg[cardValues.cardType]} alt="card type" />
            </div>
          )}
          
        </div>
        <div className="pay-row exp">
          <span className="exp-label">Exp Date *</span>
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
          <label htmlFor="cvv">CVV *</label>
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
