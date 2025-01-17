import React from "react";
import { useNavigate } from "react-router-dom";
import { SlLogout } from "react-icons/sl";
import styled from "styled-components";
import axios from "axios";
export default function Logout() {
    const navigate=useNavigate();
    const handleClick=()=>{
        localStorage.clear();
        navigate("/login"); 
    }
  return (
    <Button onClick={handleClick}>
      <SlLogout/>
    </Button>
  )
}
const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #9a86f3;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;