import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate} from "react-router-dom";
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Buffer } from "buffer";
import "./avatar.css";
export default function Avatar() {
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(undefined);
  const settings= {
    position: "top-left",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
//   const getAvatar=async ()=>{
//     const data = [];
//     for (let i = 0; i < 4; i++) {
//       const image = await axios.get(
//         `https://api.multiavatar.com/4567489${Math.round(Math.random() * 1000)}`
//       );
//       const buffer = Buffer.from(image.data);
//       data.push(buffer.toString("base64"));
//     }
//     setAvatars(data);
//     setLoading(false);
//   }
  useEffect(async () => {
    if (!localStorage.getItem("circlify"))
      navigate("/login");
  }, []);
  useEffect(async () => {
    const data = [];
    for (let i = 0; i < 4; i++) {
      const image = await axios.get(
        `https://api.multiavatar.com/4567489${Math.round(Math.random() * 1000)}`
      );
      const buffer = Buffer.from(image.data);
      data.push(buffer.toString("base64"));
    }
    setAvatars(data);
    setLoading(false);
  }, []);
  
  const handleSubmit=async ()=>{
    if(selected===undefined){
      toast.error("Please chose an avatar",settings);
    }
    else {
      const user = await JSON.parse(
        localStorage.getItem("circlify")
      );

      const { data } = await axios.post(`http://localhost:5000/api/auth/avatar/${user._id}`, {
        image: avatars[selected],
      });

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem(
          "circlify",
          JSON.stringify(user)
        );
        navigate("/");
      } else {
        toast.error("Error setting avatar. Please try again.", settings);
      }
    }
  }
  return (
    <>
    {loading ? (
      <div div className="avatarSelection">
        <img src={loader} alt="loader" className="loader" />
        </div>
    ) : (
      <div className='avatarSelection'>
        <div className="title">
          <h1>Select Your Profile Picture</h1>
        </div>
        <div className="avatars">
          {avatars.map((avatar, index) => {
            return (
              <div
                className={`avatar ${
                  selected === index ? "selected" : ""
                }`}
              >
                <img
                  src={`data:image/svg+xml;base64,${avatar}`}
                  alt="loading..."
                  key={avatar}
                  onClick={() => setSelected(index)}
                />
              </div>
            );
          })}
        </div>
        <button onClick={handleSubmit} className="btn">
          Set as Profile Picture
        </button>
        <ToastContainer />
        </div>
    )}
  </>
  )
}
