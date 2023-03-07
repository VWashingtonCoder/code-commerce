import DemonSlayer from "../assets/images/product-ds.png";
import MyHero from "../assets/images/product-mha.png";
import Naruto from "../assets/images/product-n.png";

const productsInfo = {
    DS: {
      key: "DS",
      imgSrc: DemonSlayer,
      category: "Unisex",
      itemName: "Anime Print Hoodie Demon Slayer",
      color: "Pink",
      size: "XL",
      price: 21.5,
      quantity: 1, 
      totalPrice: 21.5
    },
    MHA: {
      key: "MHA",
      imgSrc: MyHero,
      category: "Unisex",
      itemName: "Anime Print Hoodie My Hero Acad",
      color: "Multi",
      size: "XL",
      price: 27.25,
      quantity: 1, 
      totalPrice: 27.25
    },
    NAR: {
      key: "NAR",
      imgSrc: Naruto,
      category: "Unisex",
      itemName: "Anime Print Hoodie Naruto",
      color: "Orange",
      size: "XL",
      price: 24,
      quantity: 1, 
      totalPrice: 24
    },
};


/* CodeCommerce */
export const pages = ["signLog", "cart", "ship", "pay", "confirm"]
export const initBag = {
    products: Object.values(productsInfo),
    subtotal: 72.75,
    discount: 0,
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

/* Init States_Cart */

export const initTotals = { sub: 72.75, total: 72.75 };
/* */


/*Cart_Table*/
export const headers = [" ", "product", "price", "quantity", "total price"];
export const categories = ["color", "size"];
export const qtyOptions = [1, 2, 3, 4, 5];

