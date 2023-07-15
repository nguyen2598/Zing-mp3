import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
export default function Login() {
  return (
    <AuthContent>
      <form action="" method="post" id="login">
        <h3 className="heading">Sign in</h3>
        <div className="form-group">
          <input
            type="text"
            id="email"
            name="email"
            placeholder="email123@gmail.com"
            className="form-control"
          />
          <span className="form-message"></span>
        </div>
        <div className="form-group">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="123456"
            className="form-control"
          />
          <span className="form-message"></span>
        </div>
        <button className="submit">Submit</button>

        <div className="footer-login">
          <p>forget password</p>
          <p>
            <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </form>
    </AuthContent>
  );
}

const AuthContent = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url(https://1.bp.blogspot.com/-9NR1eQNjGK4/WazvmAqnphI/AAAAAAAAMXU/_7yvyipnecYZGWJnIULT-y7dOgbur9xZwCEwYBhgL/s1600/7730f1dc01b225319269cbc655cc1998.gif);
  background-repeat: no-repeat;
  //   background-color: #ccc;
  background-position: center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;

  #login {
    padding: 20px 36px;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 10px;
    h3 {
      font-size: 36px;
      color: red;
      margin-bottom: 20px;
    }

    .form-group {
      margin-bottom: 20px;

      input {
        width: 400px;
        padding: 10px 20px;
        border-radius: 10px;
        border: none;
        outline: none;
        font-size: 18px;
      }
    }
    .submit {
      width: 100%;
      padding: 10px 20px;
      background-color: #663300;
      color: #fff;
      font-size: 24px;
      cursor: pointer;
      margin-bottom: 20px;
    }

    .footer-login {
      display: flex;
      justify-content: space-between;
    }
  }
`;
