import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./Register.css";
import logo from '../../logo.png';

function Register() {
    const navigate = useNavigate();
  const [userData, setUserData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    password: "",
    c_password: "",
  });
  const handleInput = (e) => {
    setUserData({ ...userData, [e.target.id]: e.target.value });
  };
  const validate = (e)=>{
      e.preventDefault();
      let valid_fname,valid_lname,valid_email,valid_password,found_email=false;

      if(userData.fname.length>=3) valid_fname=true;
      else valid_fname=false;

      if(userData.lname.length>=3) valid_lname=true;
      else valid_lname=false;

      if(userData.password.length>=6 && userData.password===userData.c_password) valid_password=true;
      else valid_password=false;

      if(localStorage.getItem('users')){
          const users = JSON.parse(localStorage.getItem('users'))
          for(let i=0;i<users.length;i++){
              if(users[i].email===userData.email){
                  found_email=true;
                  break;
              }
          }
          if(found_email){
            valid_email=false
          }
          else{
              valid_email=true;
          }
      }
      else{
          valid_email=true;
      }
      if(valid_fname&&valid_lname&&valid_email&&valid_password){
          if(localStorage.getItem('users')){
              let users = JSON.parse(localStorage.getItem('users'))
              users.push(userData)
              localStorage.setItem('users',JSON.stringify(users))
          }
          else{
            let users = [userData];
            localStorage.setItem('users',JSON.stringify(users))
          }
          Swal.fire({
            icon: "success",
            title: "Successfully regestration !",
            text: "Account created ! ",
          }).then(function(){navigate('/login')})
      }
      else if(found_email===true){
        Swal.fire({
            icon: 'error',
            title: "Email Found !",
            text: "Your email was found in our database",
          }).then(function(){
            navigate('/login')
          })
      }
      else{
        Swal.fire({
            icon: 'error',
            title: "Check Your Data !",
            text: "First and last name must be at least 3 characters and password should be at least 5 characters",
          })
      }
  }
  return (
    <div id="register_form_container">
      <div id='logo_registerPage'>
        <img src={logo} alt="logo"/>
      </div>
      <div id="register_header">
        <h1>Register</h1>
      </div>
      <form onSubmit={validate} id="register_form">
        <div>
          <div><label htmlFor="fname">First Name : </label></div>
          <div><input type="text" id="fname" onChange={handleInput} minLength='3' required/></div>
        </div>
        <div>
          <div><label htmlFor="lname">Last Name : </label></div>
          <div><input type="text" id="lname" onChange={handleInput} minLength='3' required/></div>
        </div>
        <div>
          <div><label htmlFor="email">Email Address : </label></div>
          <div><input type="email" id="email" onChange={handleInput} required/></div>
        </div>
        <div>
          <div><label htmlFor="phone">Phone : </label></div>
          <div><input type="tel" id="phone" onChange={handleInput} minLength='10' required/></div>
        </div>
        <div>
          <div><label htmlFor="password">Password : </label></div>
          <div><input type="password" id="password" onChange={handleInput} minLength='5' required/></div>
        </div>
        <div>
          <div><label htmlFor="c_password">Confirm Password : </label></div>
          <div><input type="password" id="c_password" onChange={handleInput} minLength='5' required/></div>
        </div>
        <div>
          <button type="submit" id="submit_register_form">Register</button>
        </div>
      </form>
      <div id='login_link' className="login_register_flip">
        <p>Already have account? <Link to='/login'>Sign In</Link></p>
      </div>
    </div>
  );
}

export default Register;
