import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Buffer } from "buffer";
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
export default function SetAvatar() {
  const api = `https://api.multiavatar.com/4645646`;
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const settings = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(async () => {
    if (!localStorage.getItem("circlify"))
      navigate("/login");
  }, []);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", settings);
    } else {
      const user = await JSON.parse(
        localStorage.getItem("circlify")
      );

      const { data } = await axios.post(`http://localhost:5000/api/auth/avatar/${user._id}`, {
        image: avatars[selectedAvatar],
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
  };

  useEffect(async () => {
    const data = [];
    for (let i = 0; i < 4; i++) {
      const image = await axios.get(
        `${api}/${Math.round(Math.random() * 1000)}`
      );
      const buffer = new Buffer(image.data);
      data.push(buffer.toString("base64"));
    }
    setAvatars(data);
    setIsLoading(false);
  }, []);
  return (
    <>
      {isLoading ? (
        <Container>
          <img src={loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick an Avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    key={avatar}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button onClick={setProfilePicture} className="submit-btn">
            Set as Profile Picture
          </button>
          <ToastContainer />
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;

  .loader {
    max-inline-size: 100%;
    background-color: #0000FF;
  }

  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
`;

// import React from 'react'
// import { useState, useEffect } from "react";
// import axios from "axios";
// import styled from "styled-components";
// import { useNavigate} from "react-router-dom";
// import loader from "../assets/loader.gif";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Buffer } from "buffer";
// import "./avatar.css";
// export default function Avatar() {
//   const navigate = useNavigate();
//   const [avatars, setAvatars] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selected, setSelected] = useState(undefined);
//   const settings= {
//     position: "top-left",
//     autoClose: 4000,
//     pauseOnHover: true,
//     draggable: true,
//     theme: "dark",
//   };
// //   const getAvatar=async ()=>{
// //     const data = [];
// //     for (let i = 0; i < 4; i++) {
// //       const image = await axios.get(
// //         `https://api.multiavatar.com/4567489${Math.round(Math.random() * 1000)}`
// //       );
// //       const buffer = Buffer.from(image.data);
// //       data.push(buffer.toString("base64"));
// //     }
// //     setAvatars(data);
// //     setLoading(false);
// //   }
//   useEffect(async () => {
//     if (!localStorage.getItem("circlify"))
//       navigate("/login");
//   }, []);
//   useEffect(async () => {
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
//   }, []);
  
//   const handleSubmit=async ()=>{
//     if(selected===undefined){
//       toast.error("Please chose an avatar",settings);
//     }
//     else {
//       const user = await JSON.parse(
//         localStorage.getItem("circlify")
//       );

//       const { data } = await axios.post(`http://localhost:5000/api/auth/avatar/${user._id}`, {
//         image: avatars[selected],
//       });

//       if (data.isSet) {
//         user.isAvatarImageSet = true;
//         user.avatarImage = data.image;
//         localStorage.setItem(
//           "circlify",
//           JSON.stringify(user)
//         );
//         navigate("/");
//       } else {
//         toast.error("Error setting avatar. Please try again.", settings);
//       }
//     }
//   }
//   return (
//     <>
//     {loading ? (
//       <Container>
//       <div div className="avatarSelection">
//         <img src={loader} alt="loader" className="loader" />
//         </div>
//         </Container>
//     ) : (
//       <Container>
//       <div className='avatarSelection'>
//         <div className="title">
//           <h1>Select Your Profile Picture</h1>
//         </div>
//         <div className="avatars">
//           {avatars.map((avatar, index) => {
//             return (
//               <div
//                 className={`avatar ${
//                   selected === index ? "selected" : ""
//                 }`}
//               >
//                 <img
//                   src={`data:image/svg+xml;base64,${avatar}`}
//                   alt="loading..."
//                   key={avatar}
//                   onClick={() => setSelected(index)}
//                 />
//               </div>
//             );
//           })}
//         </div>
//         <button onClick={handleSubmit} className="btn">
//           Set as Profile Picture
//         </button>
//         <ToastContainer />
//         </Container>
//         </div>
//     )}
//   </>
//   )
//   const Container = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
//   gap: 3rem;
//   background-color: #131324;
//   height: 100vh;
//   width: 100vw;

//   .loader {
//     max-inline-size: 100%;
//   }

//   .title-container {
//     h1 {
//       color: white;
//     }
//   }
//   .avatars {
//     display: flex;
//     gap: 2rem;

//     .avatar {
//       border: 0.4rem solid transparent;
//       padding: 0.4rem;
//       border-radius: 5rem;
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       transition: 0.5s ease-in-out;
//       img {
//         height: 6rem;
//         transition: 0.5s ease-in-out;
//       }
//     }
//     .selected {
//       border: 0.4rem solid #4e0eff;
//     }
//   }
//   .submit-btn {
//     background-color: #4e0eff;
//     color: white;
//     padding: 1rem 2rem;
//     border: none;
//     font-weight: bold;
//     cursor: pointer;
//     border-radius: 0.4rem;
//     font-size: 1rem;
//     text-transform: uppercase;
//     &:hover {
//       background-color: #4e0eff;
//     }
//   }
// `;

// }
