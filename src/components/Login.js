import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";

const Login = ({ setUserName, setPassWord, logIn, logerror }) => {
  return (
    <div className="login">
      <header className="header">THE DIRECTORY</header>
      <div className="form">
        <div className="title">
          <FontAwesomeIcon icon={faRightToBracket} className="icon" />
          <h1>Log In</h1>
        </div>
        <form>
          <div className="user">
            <label forhtml="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Type 'user' here"
              onChange={(e) => setUserName(e.target.value)}
            ></input>
          </div>
          <div className="pass">
            <label forhtml="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Type 'pass' here"
              onChange={(e) => setPassWord(e.target.value)}
            ></input>
          </div>
          <button type="submit" onClick={logIn}>
            Log In
          </button>
        </form>
      </div>
      {logerror ? <p className="logerror">Invalid username/password</p> : ""}
    </div>
  );
};

export default Login;
