import { AiFillCloseCircle } from "react-icons/ai";
import { products } from "./data";
import ProductInfo from "./ProductInfo";

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
              <button className="product-btn">
                <AiFillCloseCircle />
              </button>
            </td>
            <td className="product-info-row">
              <ProductInfo
                img={imgSrc}
                category={category}
                name={itemName}
                color={color}
                size={size}
              />
            </td>
            <td className="product-price-row">{`$${price.toFixed(2)}`}</td>
            <td className="product-quantity-row">
              <select name={`quantity-${key}`} className="product-quantity">
                {[1, 2, 3, 4, 5].map((num) => (
                  <option value={num}>{num}</option>
                ))}
              </select>
            </td>
            <td className="product-total-row">
              {/* have to hook up a function to return total price of items */}
              {price.toFixed(2)}
            </td>
          </tr>
        );
      })}
    </table>
  );
};

export default Table;
