import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import { initSignUpForm, initSignUpErrors, pwInputsSignUp, nameInputsSignUp } from "./data";

const SignUpForm = (props) => {
  const [formValues, setFormValues] = useState(initSignUpForm);
  const [errors, setErrors] = useState(initSignUpErrors);
  const { showPW, showCPW, accounts, hide, add } = props
  const { email, password, postCode } = formValues;
  
function validatePassword(pass) {
    const regExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
    if(pass.length < 8 || pass.length > 20 || !regExp.test(pass)) 
        return false;
    else return true
}

function containsNumbers(str) {
    return /\d/.test(str);
}

function containsOnlyNumbers(str) {
    return /^\d+$/.test(str);
}

const validateValue = (e) => {
    let { name, value } = e.target;
    setErrors(prev => {
        const errorObj = { ...prev, [name]: "" };

        switch(name) {
            case "email":
                const emailObj = accounts.find((account) => account.email === value);
                if (!value || !value.includes('@') || !value.includes('.'))
                    errorObj[name] = "Please enter a valid email.";
                else if (emailObj)
                    errorObj[name] = "Email is already in use. Log in instead."
                break;
            case "password":
                if(!value) 
                    errorObj[name] = "Please enter a password.";
                else if(!validatePassword(value)) 
                    errorObj[name] = "Password must be 8-20 characters including at least 1 of each: lowercase letter, uppercase letter, number, and symbols(!@#$%^&*).";
                break;
            case "confirm":
                if (!value)
                    errorObj[name] = "Please confirm your password."
                else if (password !== value)
                    errorObj[name] = "Your passwords aren't matching. Please try again." 
                break;
            case "firstName":
                if (!value)
                    errorObj[name] = "Please enter your first name."
                else if(containsNumbers(value))
                    errorObj[name] = "You cannot use numbers in your first name."
                break;
            case "surname":
                if (!value)
                    errorObj[name] = "Please enter your surname."
                else if(containsNumbers(value))
                    errorObj[name] = "You cannot use numbers in your surname."
                break;
            case "postCode":
                if (!value)
                    errorObj[name] = "Please enter your postcode." 
                if (!containsOnlyNumbers(value))
                    errorObj[name] = "You cannot use letters in your postcode."
                break;
            default:
                break;
        }

        return errorObj;
    })
  }

  const changeValues = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const resetForm = () => {
    setFormValues(initSignUpForm);
  }

  const submit = (e) => {
    e.preventDefault();
    add(formValues);
    resetForm();
  }
  

  return (
      <form id="SignUpForm" onSubmit={submit}>
        <div className="sign-up form-input email">
          Your Email Address *
          <input
            type="email"
            name="email"
            value={email}
            onChange={changeValues}
            onBlur={validateValue}
            required
            autoComplete="off"
          />
          {errors.email}
        </div>
        {pwInputsSignUp.map((input) => {
          const { key, text, name } = input;
          const state = name === "password" ? showPW : showCPW; 

          return (
            <div key={key} className={`sign-up form-input ${name}`}>
              {text}
              <input
                type={state ? "text" : "password"}
                name={name}
                value={formValues[name]}
                onChange={changeValues}
                onBlur={validateValue}
                minLength="8"
                maxLength="20"
                required
              />
              <button
                className={`pw-btn ${name}`}
                value={name}
                onClick={hide}
              >
                {formValues[state] 
                    ? <AiFillEyeInvisible className="eye-icon" /> 
                    : <AiFillEye className="eye-icon" />
                }
              </button>
              {errors[name]}
            </div>
          );
        })}
        {nameInputsSignUp.map((input) => {
          const { key, label, name } = input;

          return (
            <div key={key} className={`sign-up form-input ${name}`}>
              {label}
              <input 
                type="text" 
                name={name} 
                value={formValues[name]}
                onBlur={validateValue} 
                onChange={changeValues} 
                required 
              />
              {errors[name]}
            </div>
          );
        })}
        <div className="sign-up form-input postCode">
          Postcode
          <input 
            type="text" 
            name="postCode" 
            value={postCode}
            onChange={changeValues} 
            onBlur={validateValue} 
          />
          {errors.postCode}
        </div>
        <input type="submit" value="Save" />
      </form>
  );
};

export default SignUpForm;
