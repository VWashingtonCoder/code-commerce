import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const LoginForm = (props) => {
  const { validate } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPW, setShowPW] = useState(false);


  const updateForm = (e) => {
    const { name, value } = e.target;
    name === "email" ? setEmail(value) : setPassword(value);
  };

  const hide = (e) => {
    e.preventDefault();
    setShowPW(!showPW);
  };

  const submit = (e) => {
    e.preventDefault();

    if(email && password) {
        const values = [email, password];
        validate(values);
    }
  } 

  return (
    <form id="LoginForm" onSubmit={submit}>
      <div className="login form-input">
        <label htmlFor="email" className="input-label">Email</label>
        <input
          name="email"
          type="email"
          value={email}
          onChange={updateForm}
          required
          autoComplete="off"
        />
      </div>
      <div className="login form-input pw-input-hide">
        <label htmlFor="password" className="input-label">Password</label>
        <input
          name="password"
          type={showPW ? "text" : "password"}
          value={password}
          onChange={updateForm}
          minLength="8"
          maxLength="20"
          autoComplete="off"
          required
        />
        <button className="pw-btn login-pw" onClick={hide}>
          {showPW ? (
            <AiFillEyeInvisible className="eye-icon" />
          ) : (
            <AiFillEye className="eye-icon" />
          )}
        </button>
      </div>

      <input 
        className="form-submit big-btn" 
        type="submit" 
        value="Login"
      />
    </form>
  );
};

export default LoginForm;
