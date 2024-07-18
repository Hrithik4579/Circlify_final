import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./register.css";
export default function Register() {
    const navigate=useNavigate();
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      const settings = {
        position: "top-left",
        autoClose: 4000,
        pauseOnHover: true,
        theme: "dark",
      };
      useEffect(()=>{
        if(localStorage.getItem("circlify")){
            navigate("/");
        }
      },[])
      const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
      };
      const handleValidation=()=>{
        const {username,email,password,confirmPassword}=values;
        if(password!=confirmPassword){
            toast.error("password and confirm password do not match",settings);
            return false;
        }
        else if(username.length<4){
            toast.error("Username must be atleast 4 characters",settings);
            return false;
        }
        else if(password.length<6){
            toast.error("Password must be atleast 6 characters",settings);
            return false;
        }
        else if(email==""){
            toast.error("Please enter a valid email",settings);
            return false;
        }
        return true;
      }
      const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
          const { username, email,password } = values;
          const { data } = await axios.post("http://localhost:5000/api/auth/register", {
            username,
            email,
            password,
          });
        
        if(data.status==false){
            toast.error(data.msg,settings);
        }
        if(data.status==true){
            toast.success(data.msg,settings);   
            localStorage.setItem("circlify",JSON.stringify(data.user));
            // navigate("/");
        }
    }
        };
      
  return (
    <>
    <div className='main'>
        <form action="" onSubmit={(e) => handleSubmit(e)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>Circlify</h1>
          </div>
          <input 
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Register</button>
          <span>
            Already have an account ? 
            <Link to="/login">Login</Link>
          </span>
        </form>
        {/* </FormContainer> */}
        </div>
        <ToastContainer/>
    </>
  )
}
