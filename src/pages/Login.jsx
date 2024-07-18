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
        email: "",
        password: "",
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
        const {username,password}=values;
        if(password==""){
            toast.error("Enter a valid password",settings);
            return false;
        }
        else if(username==""){
            toast.error("Please enter a valid username",settings);
            return false;
        }
        return true;
      }
      const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
          const { username,password } = values;
          const { data } = await axios.post("http://localhost:5000/api/auth/login", {
            username,
            password,
          });
        
        if(data.status==false){
            toast.error(data.msg,settings);
        }
        if(data.status==true){
            toast.success(data.msg,settings);   
            localStorage.setItem("circlify",JSON.stringify(data.user));
            navigate("/");
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
            min="4"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Login</button>
          <span>
            Don't have an account ? 
            <Link to="/register">Register</Link>
          </span>
        </form>
        </div>
        <ToastContainer/>
    </>
  )
}