import { useState } from "react";
import "./Cart.css";
import { headers, categories, qtyOptions, productsTotals } from "../data";
import { AiOutlineClose, AiFillCloseCircle } from "react-icons/ai";

const Cart = (props) => {
  const { bag, updateBag, updateDisabled, updateTotals, updateQty } = props;
  const { bagItems, quantities } = bag;
  const [status, setStatus] = useState({ message: "", item: "" });
  const [removedItems, setRemovedItems] = useState([]);
  const [itemTotals, setItemTotals] = useState(productsTotals);

  const updateStatus = (act, val, item) => {
    let message = "";

    if (act === "add") message = `${val} item(s) added to cart:`;
    else if (act === "minus") message = `${val} item(s) removed from cart:`;

    setStatus({ message: message, item: item });
  };
  const closeStatus = () => {
    setStatus({ message: "", item: "" });
  };
  const removeItem = (e) => {
    const { value } = e.target;
    const removed = bagItems.find((item) => item.key === value);
    const { key, itemName } = removed;
    const newCart = bagItems.filter((item) => item !== removed);

    setRemovedItems([...removedItems, removed]);
    updateBag({
      bagItems: newCart,
      quantities: { ...quantities, [key]: 0 },
    });
    updateTotals(
      Object.values({
        ...itemTotals,
        [key]: 0,
      })
    );
    updateStatus("minus", quantities[value], itemName);
    if (newCart.length <= 0) updateDisabled();
  };
  const undoRemove = () => {
    const currBag = [...bagItems];
    const removed = [...removedItems];
    const lastIdx = removed.length - 1;
    const lastItem = removed[lastIdx];
    const { key, itemName, price } = lastItem;
    currBag.unshift(lastItem);
    removed.pop();

    setRemovedItems(removed);
    setItemTotals({ ...itemTotals, [key]: price });
    updateStatus("add", 1, itemName);
    updateTotals(Object.values({ ...itemTotals, [key]: price }));
    updateBag({
      bagItems: currBag,
      quantities: { ...quantities, [key]: 1 },
    });
    if (currBag.length === 1) updateDisabled();
  };

  const updateQtyTotal = (e) => {
    const { name, value } = e.target;
    const newQty = Number(value);
    const item = bagItems.find((item) => item.key === name);
    const { itemName, price, key } = item;
    const fullItemTotal = price * newQty;
    const newItemTotals = { ...itemTotals, [key]: fullItemTotal };
    const newQuantities = { ...quantities, [key]: newQty };

    if (newQty > quantities[key])
      updateStatus("add", newQty - quantities[key], itemName);
    else if (newQty < quantities[key] && newQty > 0)
      updateStatus("minus", quantities[key] - newQty, itemName);
    else if (newQty === 0) {
      updateStatus("minus", quantities[key], itemName);
      removeItem(key, item);
    }
    setItemTotals(newItemTotals);
    updateTotals(Object.values(newItemTotals));
    updateQty(newQuantities);
  };

  return (
    <div id="Cart">
      {status.message && (
        <div className="status-bar flex-align-center">
          <button className="close-x icon-btn" onClick={closeStatus}>
            <AiOutlineClose className="x-icon" />
          </button>
          <div className="img-container">
            <img
              src="https://cdn-icons-png.flaticon.com/512/6745/6745042.png"
              alt="hazard sign"
            />
          </div>
          <div className="text-container">
            <p className="status-text">{status.message}</p>
            <p className="status-item">{status.item}</p>
            {removedItems.length > 0 && (
              <button className="last-btn" onClick={undoRemove}>
                Undo Last Removed Item
              </button>
            )}
          </div>
        </div>
      )}

      <table className="cart-table">
        <thead>
          <tr className="cart-table-head">
            {headers.map((head, idx) => (
              <th
                key={`head-${idx}`}
                className={`${
                  head !== " " ? `${head}-column` : "close-column"
                } t-head underline-border`}
              >
                {head}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {bagItems.map((item) => {
            const { category, color, imgSrc, itemName, key, price, size } =
              item;
            const totalPrice = itemTotals[key];

            return (
              <tr className="item-row" key={key}>
                <td className="close-column underline-border">
                  <button
                    className="remove-btn icon-btn"
                    value={key}
                    onClick={removeItem}
                  >
                    <AiFillCloseCircle className="x-icon" />
                  </button>
                </td>

                <td className="product-column underline-border">
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
                          <p className="text-value">
                            {info === "color" ? color : size}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </td>

                <td className="price-column underline-border">
                  <p className="price-text">{`$${price.toFixed(2)}`}</p>
                </td>

                <td className="quantity-column underline-border">
                  <select
                    name={key}
                    className="quantity-select"
                    onChange={updateQtyTotal}
                  >
                    {qtyOptions.map((num, idx) => (
                      <option key={idx} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </td>

                <td className="total-column underline-border">
                  <p className="total-text">{`$${totalPrice.toFixed(2)}`}</p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

//   </tr>
// );

export default Cart;
