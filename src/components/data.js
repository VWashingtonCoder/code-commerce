import DemonSlayer from "../assets/images/product-ds.png";
import MyHero from "../assets/images/product-mha.png";
import Naruto from "../assets/images/product-n.png";

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

/* Products */
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
        itemName: "Anime Print Hoodie My Hero Acad",
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
]

export const productsStates = {
  DS: { quantity: 1, totalPrice: 21.5 },
  MHA: { quantity: 1, totalPrice: 27.25 },
  NAR: { quantity: 1, totalPrice: 24 }
}

export const headers = [" ", "product", "price", "quantity", "total price"];

