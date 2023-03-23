import "./Payment.css";
import { monthOptions, yearOptions } from "../../data";
import { AiOutlineQuestionCircle } from "react-icons/ai";

const Payment = () => {

  return (
    <div id="Payment">
      <h2 className="underline-border">Payment Information</h2>
      <div className="pay-inputs-container">
        <div className="pay-row name">
          <label htmlFor="cardName">Cardholder Name</label>
          <input type="text" id="cardName" />
        </div>
        <div className="pay-row num">
          <label htmlFor="cardNum">Card Number</label>
          <input type="text" id="cardNum" />
        </div>
        <div className="pay-row exp">
          <span className="exp-label">Exp Date</span>
          <select id="expMonth">
            {monthOptions.map((month) => {
              const { key, text, value } = month;
              return (
                <option key={key} value={value} className="month-opt">
                  {text}
                </option>
              );
            })}
          </select>
          <select id="expYear">
            <option value="">Year</option>
            {yearOptions().map((year) => (
              <option key={year} value={Number(year)}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="pay-row cvv flex-align-center">
          <label htmlFor="cvv">CVV</label>
          <input type="text" id="cvv" />
          <AiOutlineQuestionCircle className="question-circle" />
        </div>
      </div>
      <button className="back-btn">Back To Cart</button>
    </div>
  );
};

export default Payment;
