import React, { useState } from "react";
import "./Login.css";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../logo.png";

function Login() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('logged_in')));

  const handleData = (e) => {
    setLoginData({ ...loginData, [e.target.id]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    let users = JSON.parse(localStorage.getItem("users"));
    let found_user = false;
    if (!users) {
      Swal.fire({
        icon: "error",
        title: "Nobody registered yet!",
        text: "Go and register now!",
      }).then(function () {
        navigate("/register");
      });
    } else {
      let index,
        found_email = false,
        correct_password = false;
      for (let i in users) {
        if (users[i].email === loginData.email) {
          found_email = true;
          index = i;
          if (users[i].password === loginData.password) {
            correct_password = true;
          }
          break;
        }
      }
      if (index !== undefined && found_email && correct_password) {
        let user = {
          fname: users[index].fname,
          lname: users[index].lname,
          email: users[index].email,
          phone: users[index].phone,
        };
        localStorage.setItem("logged_in", JSON.stringify(user));
        Swal.fire({
          icon: "success",
          title: "You Logged In",
          text: "Everything ok!",
        }).then(() => {
          if (localStorage.getItem("farm_id")) navigate("/checkout");
          else navigate("/farms");
          //refresh page
          window.location.reload(false);
        });
      } else if (
        index !== undefined &&
        found_email &&
        correct_password === false
      ) {
        Swal.fire({
          icon: "error",
          title: "Wrong Password",
          text: "Check Your Password!",
        });
      } else if (index === undefined) {
        Swal.fire({
          icon: "error",
          title: "Email Not Found !",
          text: "Create Account",
        }).then(function () {
          navigate("/register");
        });
      } else {
        alert("what the hell");
      }
    }
  };

  const logout = ()=>{
    localStorage.removeItem('logged_in');
    setUser(null)
  }

  if(!user)
  return (
    <div id="login_form_container">
      <div id="logo_loginPage">
        <img src={logo} alt="logo" />
      </div>
      <div id="login_header">
        <h1>Login</h1>
      </div>
      <form onSubmit={handleLogin} id="loginForm">
        <div>
          <label htmlFor="email">Email Address : </label>
          <br />
          <input type="email" id="email" onChange={handleData} required />
        </div>
        <div>
          <label htmlFor="password">Password : </label>
          <br />
          <input
            type="password"
            id="password"
            onChange={handleData}
            minLength="5"
            required
          />
        </div>
        <div>
          <button type="submit" id="submit_login_form">
            Login
          </button>
        </div>
      </form>
      <div className="login_register_flip">
        <p>
          No Account? <Link to="/register">Sign up!</Link>
        </p>
      </div>
    </div>
  );
  else{
    return(
      <div>
        <h1>you logged in</h1>
        <button onClick={logout}>Logout</button>
      </div>      
    )
  }
}

export default Login;
