function containsNumbers(str) {
    return /\d/.test(str);
  }

function containsLetters(str) {
    return /[A-Za-z]/.test(str);
  }
  
export function validateValues(name, val) {
    let validObj = { valid: true, error: "" };

    switch(name) {
      case "addressTitle":
        if (val === "") 
          validObj = { ...validObj, error: "* Address title cannot be blank" };
        break;
      case "name":
        if (val === "") 
          validObj = { ...validObj, error: "* Name-Surname cannot be blank" };
        else if (containsNumbers(val)) 
          validObj = { valid: false, error: "Name cannot contain numbers" };
        break;
      case "street":
        if (val === "") 
          validObj = { ...validObj, error: "* Address cannot be blank" };
        break;
      case "zip":
        if (val === "") 
          validObj = { ...validObj, error: "* Zip code cannot be blank" };
        else if (containsLetters(val)) 
          validObj = { ...validObj, valid: false, error: "* Zip code cannot contain letters"};
        break;
      case "country":
        if (val === "") validObj = { ...validObj, error: "* Select a country" };
        break;
      case "city":
        if (val === "") validObj = { ...validObj, error: "* Select a city" };
        break;
      case "state":
        if (val === "") validObj = { ...validObj, error: "* Select a state" };
        break;
      case "cellCode":
        if (val === "") 
          validObj = { ...validObj, error: "* Cell phone area code cannot be blank" };
        else if (containsLetters(val)) 
          validObj = { ...validObj, valid: false, error: "* Cell phone area code cannot contain letters"};
        break;
      case "cellNum":
        if (val === "") 
          validObj = { ...validObj, error: "* Cell phone number cannot be blank" };
        else if (containsLetters(val)) 
          validObj = { ...validObj, valid: false, error: "* Cell phone number cannot contain letters"};
        break;
      case "telCode":
        if (val === "") 
          validObj = { ...validObj, error: "* Telephone phone area code cannot be blank" };
        else if (containsLetters(val)) 
          validObj = { ...validObj, valid: false, error: "* Telephone area code cannot contain letters"};
        break;
      case "telNum":
        if (val === "") 
          validObj = { ...validObj, error: "* Telephone number cannot be blank" };
        else if (containsLetters(val)) 
          validObj = { ...validObj, valid: false, error: "* Telephone number cannot contain letters"};
        break;
      default:
        break;
    }

    return validObj;
  }