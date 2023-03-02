import { AiFillCloseCircle } from "react-icons/ai";
import { headers } from "./data";

const Table = (props) => {
  const { cart, states, remove, update } = props
  return (
    <table id="Table">
      <thead>
        <tr className="cart-table-head">
          {headers.map((head, idx) => (
            <th key={`head-${idx}`}>{head}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {cart.map((item) => {
          const { key, imgSrc, category, itemName, color, size, price } = item;

          return (
            <tr className="product-row" key={key}>
              <td className="product-btn-cell">
                <button className="product-btn icon-btn" value={key} onClick={remove}>
                  <AiFillCloseCircle className="remove-x" />
                </button>
              </td>
              <td className="product-info-row">
                <div className="product-info flex-align-center">
                  <div className="img-container">
                    <img src={imgSrc} alt={`${itemName} display`} />
                  </div>
                  <div className="text-container">
                    <p className="category-text">{category}</p>
                    <p className="name-text">{itemName}</p>
                    <div className="info-container flex-align-center">
                      <p className="text-label">Color:</p>
                      <p className="text-value">{color}</p>
                    </div>
                    <div className="info-container flex-align-center">
                      <p className="text-label">Size:</p>
                      <p className="text-value">{size}</p>
                    </div>
                  </div>
                </div>
              </td>
              <td className="product-price-row price">
                {`$${price.toFixed(2)}`}
              </td>
              <td className="product-quantity-row">
                <select
                  name={key}
                  className="product-quantity"
                  onChange={update}
                >
                  {[1, 2, 3, 4, 5].map((num, idx) => (
                    <option key={idx} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </td>
              <td className="product-total-row price">
                {`$${states[key].totalPrice.toFixed(2)}`}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
