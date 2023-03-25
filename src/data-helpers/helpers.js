function containsNumbers(str) {
  return /\d/.test(str);
}

function containsLetters(str) {
  return /[A-Za-z]/.test(str);
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

export function validateValues(name, val) {
  let validObj = { valid: true, error: "" };

  switch (name) {
    case "addressTitle":
      if (!val)
        validObj = { ...validObj, error: "* Enter your address title" };
      break;
    case "name":
      if (!val)
        validObj = { ...validObj, error: "* Enter your name-surname" };
      else if (containsNumbers(val))
        validObj = { valid: false, error: "* Name cannot contain numbers" };
      break;
    case "street":
      if (!val) validObj = { ...validObj, error: "* Enter your address" };
      break;
    case "zip":
      if (!val) validObj = { ...validObj, error: "* Enter your zip code" };
      else if (containsLetters(val))
        validObj = {
          ...validObj,
          valid: false,
          error: "* Zip code cannot contain letters",
        };
      break;
    case "country":
      if (!val) validObj = { ...validObj, error: "* Select a country" };
      break;
    case "city":
      if (!val) validObj = { ...validObj, error: "* Select a city" };
      break;
    case "state":
      if (!val) validObj = { ...validObj, error: "* Select a state" };
      break;
    case "cellCode":
      if (!val)
        validObj = {
          ...validObj,
          error: "* Enter your cell phone area code",
        };
      else if (containsLetters(val))
        validObj = {
          ...validObj,
          valid: false,
          error: "* Cell phone area code cannot contain letters",
        };
      break;
    case "cellNum":
      if (!val)
        validObj = {
          ...validObj,
          error: "* Enter your cell phone number",
        };
      else if (containsLetters(val))
        validObj = {
          ...validObj,
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
      else if (containsLetters(val))
        validObj = {
          ...validObj,
          valid: false,
          error: "* Telephone area code cannot contain letters",
        };
      break;
    case "telNum":
      if (!val)
        validObj = { ...validObj, error: "* Enter your telephone number" };
      else if (containsLetters(val))
        validObj = {
          valid: false,
          error: "* Telephone number cannot contain letters",
        };
      break;
    case "cardName":
      if (!val)
        validObj = { ...validObj, error: "* Card name cannot be blank" };
      else if (containsNumbers(val))
        validObj = {
          valid: false,
          error: "* Card name cannot contain numbers",
        };
      break;
    case "cardNum":
      const validCardMessage = cardNumberValidation(val);
      if (!val)
        validObj = { ...validObj, error: "* Card number cannot be blank" };
      else if (containsLetters(val))
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
