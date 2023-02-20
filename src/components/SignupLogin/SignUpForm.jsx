import { useState } from "react";

const SignUpForm = () => {
  const initStates = {
    email: "",
    password: "",
    confirm: "",
    firstName: "",
    surname: "",
    postCode: "",
    showPassword: false,
    showConfirmPW: false,
    passwordMatch: true,
  };
  const [formValues, setFormValues] = useState(initStates);
  const { password, showPassword, showConfirmPW, passwordMatch } = formValues;
  const pwInputs = [
    {
      key: "pw",
      text: "Create Password *",
      state: "showPassword",
      name: "password",
      bottom: "Password must be 8-20 characters",
    },
    {
      key: "con",
      text: "Confirm Password *",
      state: "showConfirmPW",
      name: "confirm",
      bottom: "Passwords don't match",
    },
  ];
  const nameInputs = [
    { key: "first", label: "First Name *", name: "firstName" },
    { key: "sur", label: "Surname *", name: "surname" },
  ];

  const checkPassword = (value) => {
    if (value === password || (value !== password && passwordMatch === true))
      setFormValues({ ...formValues, passwordMatch: !passwordMatch });
  };

  const changeValues = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    if (name === "confirm") checkPassword(value);
  };

  const toggleHide = (e) => {
    e.preventDefault();
    e.target.value === "password"
      ? setFormValues({ ...formValues, showPassword: !showPassword })
      : setFormValues({ ...formValues, showConfirmPW: !showConfirmPW });
  };

  return (
    <>
      <form id="SignUpForm">
        <div className="sign-up form-input email">
          Your Email Address *
          <input
            type="email"
            name="email"
            onChange={changeValues}
            required
            autoComplete="off"
          />
        </div>
        {pwInputs.map((input) => {
          const { key, text, state, name, bottom } = input;

          return (
            <div key={key} className={`sign-up form-input ${name}`}>
              {text}
              <input
                type={formValues[state] ? "text" : "password"}
                name={name}
                onChange={changeValues}
                minLength="8"
                maxLength="20"
                required
              />
              <button
                className={`pw-btn ${name}`}
                value={name}
                onClick={toggleHide}
              >
                Show Password
              </button>
              {key === "pw" && <p>{bottom}</p>}
              {key === "con" && !passwordMatch && <p>{bottom}</p>}
            </div>
          );
        })}
        {nameInputs.map((input) => {
          const { key, label, name } = input;

          return (
            <div key={key} className={`sign-up form-input ${name}`}>
              {label}
              <input type="text" name={name} onChange={changeValues} required />
            </div>
          );
        })}
        <div className="sign-up form-input postCode">
          Postcode
          <input type="text" name="postCode" onChange={changeValues} />
        </div>
        <input type="submit" value="Save" />
      </form>

      <div className="operator">OR</div>

      <div className="facebook-btn">
        <p>Icon</p>
        <p>Sign Up With Facebook</p>
      </div>

      <footer>
        <p>Privacy Policy and Cookies</p>
        <p>Terms of Sale and Use</p>
      </footer>
    </>
  );
};

export default SignUpForm;
