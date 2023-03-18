function containsNumbers(str) {
    return /\d/.test(str);
  }

function containsLetters(str) {
    return /[A-Za-z]/.test(str);
  }
  
export function validateValues(name, val) {
    let valid = true;

    if (name === "name") {
      if (containsNumbers(val)) valid = false;
    } else if (name === "zip" 
      || name === "cellCode" 
      || name === "cellNum"
      || name === "telCode"
      || name === "telNum"
    ) {
      if (containsLetters(val)) valid = false;
    }

    return valid;
  }