function containsOnlyNumbers(str) {
  return /^\d+$/.test(str);
}

function containsOnlyLetters(str) {
  return /^[A-Za-z]+$/.test(str);
}

function cardNumberValidation(cardNumber) {
  const regexPattern = {
    MASTERCARD: /^5[1-5][0-9]{1,}|^2[2-7][0-9]{1,}$/,
    VISA: /^4[0-9]{2,}$/,
    DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
    AMERICAN_EXPRESS: /^3[47][0-9]{5,}$/,
  };
  for (const card in regexPattern) {
    if (cardNumber.replace(/[^\d]/g, "").match(regexPattern[card])) {
      if (cardNumber) {
        return cardNumber &&
          /^[1-6]{1}[0-9]{14,15}$/i.test(
            cardNumber.replace(/[^\d]/g, "").trim()
          )
          ? ""
          : "Enter a valid Card";
      }
    }
  }
  return "Enter a valid Card";
}

function passwordValidation(pass) {
  const regExp =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
  if (pass.length < 8 || pass.length > 20 || !regExp.test(pass)) return false;
  else return true;
}

export function validateSignUpValues(name, val, password) {
  let validObj = { valid: true, error: "" };

  switch (name) {
    case "email":
      if (!val || !val.includes("@") || !val.includes("."))
        validObj = { ...validObj, error: "Please enter a valid email." };
      break;
    case "password":
        if (!val || !passwordValidation(val)) 
          validObj = { ...validObj, error: "Please enter a valid password." };
        break;
      case "confirm":
        if (!val) 
          validObj = { ...validObj, error: "Please confirm your password." };
        else if (val !== password)
          validObj = { ...validObj, error: "Your passwords aren't matching." };
        break;
      case "firstName":
        if (!val) 
          validObj = { ...validObj, error: "Please enter your first name." };
        else if (!containsOnlyLetters(val))
          validObj = { valid: false, error: "No numbers in your name please." }; 
        break;
      case "surname":
        if (!val)
          validObj = { ...validObj, error: "Please enter your surname." }; 
        else if (!containsOnlyLetters(val))
          validObj = { valid: false, error: "No numbers in your name please." };
          break;
      case "postCode":
        if (!val) break;
        else if (!containsOnlyNumbers(val))
          validObj = { valid: false, error: "No letters in your postcode please." };
          break;
        default:
          break;
      }
  return validObj;
}

export function validateShipValues(name, val) {
  let validObj = { valid: true, error: "" };

  switch (name) {
    case "addressTitle":
      if (!val) 
        validObj = { ...validObj, error: "* Please enter your address title." };
      break;
    case "name":
      if (!val)
        validObj = { ...validObj, error: "* Please enter your name-surname." };
      else if (containsOnlyNumbers(val))
        validObj = { valid: false, error: "* No numbers in your name please." };
      break;
    case "street":
      if (!val) 
        validObj = { ...validObj, error: "* Please enter your address." };
      break;
    case "zip":
      if (!val) 
        validObj = { ...validObj, error: "* Please enter your zip code." };
      else if (containsOnlyLetters(val))
        validObj = { valid: false, error: "* No letters in your zip code please." };
      break;
    case "country":
      if (!val) validObj = { ...validObj, error: "* Select a country." };
      break;
    case "city":
      if (!val) validObj = { ...validObj, error: "* Select a city." };
      break;
    case "state":
      if (!val) validObj = { ...validObj, error: "* Select a state." };
      break;
    case "cellCode":
      if (!val)
        validObj = { ...validObj, error: "* Please enter your cell phone code." };
      else if (containsOnlyLetters(val))
        validObj = { valid: false, error: "* No letters in cell phone code please." };
      break;
    case "cellNum":
      if (!val)
        validObj = { ...validObj, error: "* Please enter your cell phone number." };
      else if (containsOnlyLetters(val))
        validObj = {
          valid: false,
          error: "* Cell phone number cannot contain letters",
        };
      break;
    case "telCode":
      if (!val)
        validObj = {
          ...validObj,
          error: "* Enter your telephone phone area code",
        };
      else if (containsOnlyLetters(val))
        validObj = {
          ...validObj,
          valid: false,
          error: "* Telephone area code cannot contain letters",
        };
      break;
    case "telNum":
      if (!val)
        validObj = { ...validObj, error: "* Enter your telephone number" };
      else if (containsOnlyLetters(val))
        validObj = {
          valid: false,
          error: "* Telephone number cannot contain letters",
        };
      break;
    default:
      break;
  }

  return validObj
}

export function validateValues(name, val) {
  let validObj = { valid: true, error: "" };

  switch (name) {
    case "cardName":
      if (!val)
        validObj = { ...validObj, error: "* Card name cannot be blank" };
      else if (containsOnlyNumbers(val))
        validObj = {
          valid: false,
          error: "* Card name cannot contain numbers",
        };
      break;
    case "cardNum":
      const validCardMessage = cardNumberValidation(val);
      if (!val)
        validObj = { ...validObj, error: "* Card number cannot be blank" };
      else if (containsOnlyLetters(val))
        validObj = {
          valid: false,
          error: "* Card number cannot contain letters",
        };
      else if (validCardMessage) {
        validObj = { ...validObj, error: validCardMessage };
      }
      break;
    case "expMonth":
      if (!val) validObj = { ...validObj, error: "* Pick an expiration month" };
      break;
    case "expYear":
      if (!val) validObj = { ...validObj, error: "* Pick an expiration year" };
      break;
    case "cvv":
      if (!val) validObj = { ...validObj, error: "* Enter your cvv" };
      else if (val.length < 3) 
        validObj = { ...validObj, error: "* CVV must be 3 characters or more" };
      break;
    default:
      break;
  }

  return validObj;
}
