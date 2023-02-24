import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import {
  initSignUpForm,
  initSignUpErrors,
  pwInputsSignUp,
  nameInputsSignUp,
} from "./data";

const SignUpForm = (props) => {
  const [formValues, setFormValues] = useState(initSignUpForm);
  const [errors, setErrors] = useState(initSignUpErrors);
  const [validForm, setValidForm] = useState(true);
  const { showPW, showCPW, accounts, hide, add } = props;
  const { email, password, postCode } = formValues;

  function validatePassword(pass) {
    const regExp =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
    if (pass.length < 8 || pass.length > 20 || !regExp.test(pass)) return false;
    else return true;
  }

  function containsNumbers(str) {
    return /\d/.test(str);
  }

  function containsOnlyNumbers(str) {
    return /^\d+$/.test(str);
  }

  const validateValue = (e) => {
    let { name, value } = e.target;
    setValidForm(true);
    setErrors((prev) => {
      const errorObj = { ...prev, [name]: "" };

      switch (name) {
        case "email":
          const emailObj = accounts.find((account) => account.email === value);
          if (!value || !value.includes("@") || !value.includes("."))
            errorObj[name] = "Please enter a valid email.";
          else if (emailObj)
            errorObj[name] = "Email is already in use. Log in instead.";
          break;
        case "password":
          if (!value || !validatePassword(value)) errorObj[name] = "Please enter a valid password.";
          break;
        case "confirm":
          if (!value) errorObj[name] = "Please confirm your password.";
          else if (password !== value)
            errorObj[name] =
              "Your passwords aren't matching.";
          break;
        case "firstName":
          if (!value) errorObj[name] = "Please enter your first name.";
          else if (containsNumbers(value))
            errorObj[name] = "No numbers in your name please.";
          break;
        case "surname":
          if (!value) errorObj[name] = "Please enter your surname.";
          else if (containsNumbers(value))
            errorObj[name] = "No numbers in your name please.";
          break;
        case "postCode":
          if (!value) errorObj[name] = "Please enter your postcode.";
          if (!containsOnlyNumbers(value))
            errorObj[name] = "No letters in your postcode please.";
          break;
        default:
          break;
      }

      if(name !== "postCode" && errorObj[name] !== "") 
        setValidForm(false);

      return errorObj;
    });
  };

  const changeValues = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const resetForm = () => {
    setFormValues(initSignUpForm);
  };

  const submit = (e) => {
    e.preventDefault();
    
    if(validForm){
      add(formValues);
      resetForm();
    }
  };

  return (
    <form id="SignUpForm" onSubmit={submit}>
        {!validForm && <p className="head-error">We're sorry, but one or more fields are incomplete or incorrect</p>}
      <div className="sign-up form-input email">
        <div className="input-labels flex-align-center">
          <label htmlFor="email">Your Email Address *</label>
          <span className="error-text">{errors.email}</span>
        </div>
        <input
          className={errors.email && "active-error"}
          type="email"
          name="email"
          value={email}
          onChange={changeValues}
          onBlur={validateValue}
          required
          autoComplete="off"
        />
      </div>
      {pwInputsSignUp.map((input) => {
        const { key, text, name } = input;
        const state = name === "password" ? showPW : showCPW;

        return (
          <div key={key} className={`sign-up form-input ${name}`}>
            <div className="input-labels flex-align-center">
              <label htmlFor={name}>{text}</label>
              <span className="error-text">{errors[name]}</span>
            </div>
            <div className="pw-input-hide">
              <input
                className={errors[name] && "active-error"}
                type={state ? "text" : "password"}
                name={name}
                value={formValues[name]}
                onChange={changeValues}
                onBlur={validateValue}
                minLength="8"
                maxLength="20"
                autoComplete="off"
                required
              />
              <button className={`pw-btn ${name}`} value={name} onClick={hide}>
                {formValues[state] ? (
                  <AiFillEyeInvisible className="eye-icon" />
                ) : (
                  <AiFillEye className="eye-icon" />
                )}
              </button>
            </div>
            { name==="password" && <p className="pw-rules">Password must be 8-20 characters, including: at least one capital letter, at least one small letter, one number, and one special character - !@#$%^&*</p>}
          </div>
        );
      })}
      {nameInputsSignUp.map((input) => {
        const { key, label, name } = input;

        return (
          <div key={key} className={`sign-up form-input ${name}`}>
            <div className="input-labels flex-align-center">
              <label htmlFor={name}>{label}</label>
              <span className="error-text">{errors[name]}</span>
            </div>
            <input
                className={errors[name] && "active-error"}
              type="text"
              name={name}
              value={formValues[name]}
              onBlur={validateValue}
              onChange={changeValues}
              autoComplete="off"
              required
            />
          </div>
        );
      })}
      <div className="sign-up form-input postCode">
        <div className="input-labels flex-align-center">
          <label htmlFor="postCode">Postcode</label>
          <span className="error-text">{errors.postCode}</span>
        </div>
        <input
            className={errors.postCode && "active-error"}
          type="text"
          name="postCode"
          value={postCode}
          onChange={changeValues}
          onBlur={validateValue}
            autoComplete="off"
        />
      </div>
      <input 
        className="form-submit big-btn" 
        type="submit" 
        value="Save"
      />
    </form>
  );
};

export default SignUpForm;
