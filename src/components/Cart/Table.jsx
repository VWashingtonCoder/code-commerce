import { AiFillCloseCircle } from "react-icons/ai";
import { headers, categories, qtyOptions } from "../data";

const Table = (props) => {
  const { cart, remove, update } = props
  return (
    <table id="Table">
      <thead>
        <tr className="cart-table-head">
          {headers.map((head, idx) => (
            <th key={`head-${idx}`} className={`${head} t-head underline-border`}>{head}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {cart.map((item) => {
          const { key, imgSrc, category, itemName, color, size, price, totalPrice } = item;

          return (
            <tr className="product-row" key={key}>
              <td className="product-column remove underline-border">
                <button className="product-btn icon-btn" value={key} onClick={remove}>
                  <AiFillCloseCircle className="remove-x" />
                </button>
              </td>

              <td className="product-column item underline-border">
                <div className="product-info flex-align-center">
                  <div className="img-container">
                    <img src={imgSrc} alt={`${itemName} display`} />
                  </div>
                  <div className="text-container">
                    <p className="category-text">{category}</p>
                    <p className="name-text">{itemName}</p>
                    {categories.map((info) => (
                      <div className="info-container flex-align-center">
                        <p className="text-label">{info}:</p>
                        <p className="text-value">{info === "color" ? color : size}</p>
                      </div>  
                    ))}
                  </div>
                </div>
              </td>

              <td className="product-column price underline-border">
                {`$${price.toFixed(2)}`}
              </td>

              <td className="product-column quantity underline-border">
                <select
                  name={key}
                  className="product-quantity"
                  onChange={update}
                >
                  {qtyOptions.map((num, idx) => (
                    <option key={idx} value={num}>{num}</option>
                  ))}
                </select>
              </td>

              <td className="product-column total underline-border">
                {`$${totalPrice.toFixed(2)}`}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
