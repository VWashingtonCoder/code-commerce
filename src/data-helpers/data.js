import TicTacToe from "../assets/images/tic-tac-toe.png";
import Sun from "../assets/images/sun.jpg";
import Love from "../assets/images/love.png";
import Discover_Icon from "../assets/images/discover.png";
import Mastercard_Icon from "../assets/images/masterCard.png";
import Visa_Icon from "../assets/images/visa.png";
import Amex_Icon from "../assets/images/amex.png";
/* Init States_Products */
export const productsInfo = [
  {
    key: "TTT",
    imgSrc: TicTacToe,
    category: "Game",
    itemName: "Tic Tac Toe",
    frame: "React",
    price: 21.5,
  },
  {
    key: "WEA",
    imgSrc: Sun,
    category: "App",
    itemName: "Weather Watcher",
    frame: "React",
    price: 27.25,
  },
  {
    key: "DWS",
    imgSrc: Love,
    category: "Website",
    itemName: "Dating (Template)",
    frame: "HTML/CSS",
    price: 24,
  },
];
export const productsQuantities = {
  TTT: 1,
  WEA: 1,
  DWS: 1,
};
export const productsTotals = {
  TTT: 21.5,
  WEA: 27.25,
  DWS: 24,
};

/* CodeCommerce */
export const pageKeys = ["signLog", "cart", "ship", "pay", "confirm"];
export const initBag = {
  bagItems: productsInfo,
  quantities: productsQuantities,
};
export const initTotals = {
  items: productsTotals,
  subtotal: 72.75,
  shipCost: 0,
  discount: 0,
  total: 72.75,
};
export const initBarProgress = {
  ship: false,
  pay: false,
};
/* SignupLogin */
export const initSignUpForm = {
  email: "",
  password: "",
  confirm: "",
  firstName: "",
  surname: "",
  postCode: "",
};
export const pwInputsSignUp = [
  { key: "pw", text: "Create Password *", name: "password" },
  { key: "con", text: "Confirm Password *", name: "confirm" },
];
export const nameInputsSignUp = [
  { key: "first", label: "First Name *", name: "firstName" },
  { key: "sur", label: "Surname *", name: "surname" },
];
export const initAccounts = [
  {
    key: 0,
    email: "ex@gmail.com",
    password: "Password#1",
    name: "Jacob Johnson",
    zip: "33404"
  }
];
/*Cart_Table*/
export const headers = [" ", "product", "price", "quantity", "total"];
export const qtyOptions = [1, 2, 3, 4, 5];
export const discountCodes = { CODE10: 10, CODE15: 15, CODE20: 20 };
/*Shipping*/
export const initShipFormValues = {
  addressTitle: "",
  name: "",
  street: "",
  zip: "",
  country: "",
  city: "",
  state: "",
  cellCode: "",
  cellNum: "",
  telCode: "",
  telNum: "",
};
export const initShipFormErrors = {
  addressTitle: "",
  name: "",
  street: "",
  zip: "",
  country: "",
  city: "",
  state: "",
  cellCode: "",
  cellNum: "",
  telCode: "",
  telNum: "",
};
export const cities = {
  DEN: "Denver",
  FOU: "Fountain",
  PUE: "Pueblo",
};
export const phoneData = [
  { key: "cell", label: "Cell Phone" },
  { key: "tel", label: "Telephone" },
];
export const shipMethods = [
  {
    key: "standard",
    info: "Delivery in 4-6 Business Days - Free",
    cost: 0,
  },
  {
    key: "express",
    info: "Delivery in 1-3 Business Days - $5.00",
    cost: 5,
  },
];

/* Payment */
export const initCardForm = {
  cardName: "",
  cardNum: "",
  cardType: "",
  expMonth: "",
  expYear: "",
  cvv: "",
};
export const cardErrorKeys = [
  "cardName",
  "cardNum",
  "expMonth",
  "expYear",
  "cvv",
];
export const monthOptions = [
  { key: 0, text: "Month", value: "" },
  { key: 1, text: "01-Jan", value: "01" },
  { key: 2, text: "02-Feb", value: "02" },
  { key: 3, text: "03-Mar", value: "03" },
  { key: 4, text: "04-Apr", value: "04" },
  { key: 5, text: "05-Mar", value: "05" },
  { key: 6, text: "06-Jun", value: "06" },
  { key: 7, text: "07-Jul", value: "07" },
  { key: 8, text: "08-Aug", value: "08" },
  { key: 9, text: "09-Sep", value: "09" },
  { key: 10, text: "10-Oct", value: "10" },
  { key: 11, text: "11-Nov", value: "11" },
  { key: 12, text: "12-Dec", value: "12" },
];
export const yearOptions = () => {
  const years = [];
  const yearsLength = 10;
  const currentYear = new Date().getFullYear();
  for (let i = 0; i < yearsLength; i++) {
    years.push(currentYear + i);
  }
  return years;
};
export const cardTypeImg = {
  AMERICAN_EXPRESS: Amex_Icon,
  DISCOVER: Discover_Icon,
  MASTERCARD: Mastercard_Icon,
  VISA: Visa_Icon,
};

export const initShipInfo = {
  addressData: {
    name: "",
    street: "",
    zip: "",
    country: "",
    city: "",
    state: "",
  },
  methodData: {
    method: "standard",
    info: "Delivery in 4-6 Business Days",
  },
};
