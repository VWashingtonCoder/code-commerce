import { AiFillCloseCircle } from "react-icons/ai";
import { products } from "./data";

const Table = () => {
  const headers = [" ", "Product", "Price", "Quantity", "Total Price"];

  return (
    <table id="Table">
      <tr className="cart-table-head">
        {headers.map((head, idx) => (
          <th key={`head-${idx}`}>{head}</th>
        ))}
      </tr>

      {products.map((item, idx) => {
        const { imgSrc, category, itemName, color, size, price } = item;
        const key = idx + 1;

        return (
          <tr className="product-row" key={key}>
            <td className="product-btn-cell">
              <button className="product-btn icon-btn">
                <AiFillCloseCircle />
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
              <select name={`quantity-${key}`} className="product-quantity">
                {[1, 2, 3, 4, 5].map((num, idx) => (
                  <option key={idx} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </td>
            <td className="product-total-row price">
              {/* have to hook up a function to return total price of items */}
              {`$${price.toFixed(2)}`}
            </td>
          </tr>
        );
      })}
    </table>
  );
};

export default Table;
