import { useState } from "react";
import "./SignupLogin.css";
import SignUpForm from "./SignUpForm";

const SignupLogin = () => {
    const [signLog, setSignLog] = useState("sign-up");
    
    const toggleSignLog = (e) => {
        setSignLog(e.target.value);
    }

    return (
        <div id="SignupLogin">
            <h1>SignupLogin</h1>
            <div className="top-bar">
                <div className="close-x header-md">X</div>
                <div className="sign-log-inputs" onChange={toggleSignLog}>
                    <input type="radio" value="sign-up" name="signLog" defaultChecked/> Create Account
                    <input type="radio" value="login" name="signLog" /> Log In
                </div>
            </div>

            {
                signLog === "sign-up" ? <SignUpForm/> : null
            }
        </div>
    );
}

export default SignupLogin;