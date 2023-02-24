import { useState } from "react";
import { AiOutlineClose, AiFillFacebook } from "react-icons/ai";
import { MdHorizontalRule } from "react-icons/md";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import "./SignupLogin.css";

const SignupLogin = ({ pageSet }) => {
  const [signLog, setSignLog] = useState("sign-up");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPW, setShowConfirmPW] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [status, setStatus] = useState("");

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
    const { email, password, firstName, surname, postCode } = values;
    const accountInfo = {
      key: accounts.length + 1,
      email: email.toLowerCase(),
      password: password,
      name: `${firstName} ${surname}`,
      zip: postCode,
    };
    setAccounts([...accounts, accountInfo]);
    setStatus(`Welcome ${firstName} ${surname}. Please log in.`);
    setSignLog("login");
  };

  const validateLogin = (info) => {
    const [email, password] = info;

    const emailObj = accounts.find((account) => account.email === email.toLowerCase());

    if(!emailObj 
        || emailObj.email !== email.toLowerCase()
        || emailObj.password !== password
      ) {
      setStatus("Account not found. Try again.");
    } else pageSet("cart");
  }

  return (
    <div id="SignupLogin">
      <AiOutlineClose className="close-x" />
      <div 
        className="sign-log-inputs flex-align-center" 
        onChange={toggleSignLog}
      >   
        <input 
          type="radio" 
          value="sign-up" 
          name="signLog" 
          checked={signLog === "sign-up"}
        />
        <label className={signLog === "sign-up" && "active"}>
          Create Account
        </label>
        <input 
          type="radio" 
          value="login" 
          name="signLog"
          checked={signLog === "login"} 
        />
        <label className={signLog === "login" && "active"}>Log In</label>
      </div>

      {status && <p className="status">{status}</p>}

      {signLog === "sign-up" 
        ? (<SignUpForm
            showPW={showPassword}
            showCPW={showConfirmPW}
            accounts={accounts}
            hide={toggleHide}
            add={addToAccounts}
          />) 
        : (<LoginForm 
            validate={validateLogin}
          />)
      }
      
      <div className="operator flex-align-center">
        <MdHorizontalRule className="solid-line" /> 
        OR 
        <MdHorizontalRule className="solid-line" />
      </div>

      <button className="facebook-btn big-btn flex-align-center">
        <AiFillFacebook className="fb-icon"/>
        Sign {signLog === "sign-up" ? "Up" : "In"} With Facebook
      </button>

      <footer className="form-footer">
        {["Privacy Policy and Cookies", "Terms of Sale and Use"].map((item, idx) => (
          <button key={idx} className="foot-link">{item}</button>  
        ))}
      </footer>
    </div>
  );
};

export default SignupLogin;
