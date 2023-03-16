import DemonSlayer from "./assets/images/product-ds.png";
import MyHero from "./assets/images/product-mha.png";
import Naruto from "./assets/images/product-n.png";
/* Init States_Products */
export const productsInfo = [
  {
    key: "DS",
    imgSrc: DemonSlayer,
    category: "Unisex",
    itemName: "Anime Print Hoodie Demon Slayer",
    color: "Pink",
    size: "XL",
    price: 21.5,
  },
  {
    key: "MHA",
    imgSrc: MyHero,
    category: "Unisex",
    itemName: "Anime Print Hoodie My Hero Academia",
    color: "Multi",
    size: "XL",
    price: 27.25,
  },
  {
    key: "NAR",
    imgSrc: Naruto,
    category: "Unisex",
    itemName: "Anime Print Hoodie Naruto",
    color: "Orange",
    size: "XL",
    price: 24,
  },
];
export const productsQuantities = { DS: 1, MHA: 1, NAR: 1 };
export const productsTotals = { DS: 21.5, MHA: 27.25, NAR: 24 };

/* CodeCommerce */
export const pageKeys = ["signLog", "cart", "ship", "pay", "confirm"];
export const initBag = {
  bagItems: productsInfo,
  quantities: productsQuantities,
};
export const initTotals = { 
  items: productsTotals,
  subtotal: 72.75, 
  total: 72.75 
}
/* SignupLogin */
export const initSignUpForm = {
  email: "",
  password: "",
  confirm: "",
  firstName: "",
  surname: "",
  postCode: "",
};
export const initSignUpErrors = {
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

/*Cart_Table*/
export const headers = [" ", "product", "price", "quantity", "total"];
export const categories = ["color", "size"];
export const qtyOptions = [1, 2, 3, 4, 5];

/*Shipping*/
export const cities = {
  DEN: "Denver",
  FOU: "Fountain",
  PUE: "Pueblo",
};
export const phoneData = [
  { key: "cell", label: "Cell Phone" },
  { key: "tel", label: "Telephone" }
]; 
export const shipMethods = [
  {
    key: "standard",
    info: "Delivery in 4-6 Business Days - Free",
  },
  {
    key: "express",
    info: "Delivery in 1-3 Business Days - $5.00",
  },
];