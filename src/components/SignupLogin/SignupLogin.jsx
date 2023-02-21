import { useState } from "react";
import "./SignupLogin.css";
import SignUpForm from "./SignUpForm";

const SignupLogin = () => {
  const [signLog, setSignLog] = useState("sign-up");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPW, setShowConfirmPW] = useState(false);
  const [accounts, setAccounts] = useState([]);

  const toggleSignLog = (e) => {
    setSignLog(e.target.value);
  };

  const toggleHide = (e) => {
    e.preventDefault();
    e.target.value === "password"
      ? setShowPassword(!showPassword)
      : setShowConfirmPW(!showConfirmPW);
  };

  const addToAccounts = (values) => {
    const { 
        email, 
        password, 
        firstName, 
        surname, 
        postCode 
    } = values;
    const accountInfo = {
        key: accounts.length + 1,
        email: email,
        password: password,
        name: `${firstName} ${surname}`,
        zip: postCode
    }
    setAccounts([...accounts, accountInfo]);
  }


  return (
    <div id="SignupLogin">
      <h1>SignupLogin</h1>
      <div className="top-bar">
        <div className="close-x header-md">X</div>
        <div className="sign-log-inputs" onChange={toggleSignLog}>
          <input type="radio" value="sign-up" name="signLog" defaultChecked />{" "}
          Create Account
          <input type="radio" value="login" name="signLog" /> Log In
        </div>
      </div>

      {signLog === "sign-up" ? (
        <SignUpForm
          showPW={showPassword}
          showCPW={showConfirmPW}
          accounts={accounts}
          hide={toggleHide}
          add = {addToAccounts}
        />
      ) : null}
      <div className="operator">OR</div>

      <div className="facebook-btn">
        <span>Icon</span>
        Sign {signLog==="sign-up" ? "Up" : "In"} With Facebook
      </div>

      <footer>
        <p>Privacy Policy and Cookies</p>
        <p>Terms of Sale and Use</p>
      </footer>
    </div>
  );
};

export default SignupLogin;
