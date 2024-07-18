import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import Chat from "../components/Chat";
import Contacts from "../components/Contacts";
import Home from "../components/Home";

export default function Content() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(async () => {
    if (!localStorage.getItem("circlify")) {
      navigate("/login");
    } else {
      setCurrentUser(
        await JSON.parse(
          localStorage.getItem("circlify")
        )
      );
    }
  }, []);
  useEffect(() => {
    if (currentUser) {
      socket.current = io("http://localhost:5000");
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(async () => {
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        const data = await axios.get(`http://localhost:5000/api/auth/contacts/${currentUser._id}`);
        setContacts(data.data);
      } else {
        navigate("/avatar");
      }
    }
  }, [currentUser]);
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  return (
    <>
      <Container>
        <div className="container">
          <Contacts contacts={contacts} changeChat={handleChatChange} />
          {currentChat === undefined ? (
            <Home />
          ) : (
            <Chat currentChat={currentChat} socket={socket} />
          )}
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;


// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// // import "./content.css";
// import styled from "styled-components";

// import Contacts from "../components/Contacts";
// import Home from "../components/Home";
// import Chat from "../components/Chat";
// export default function Content() {
//   const navigate=useNavigate();
//   const [contacts,setContacts]=useState([]);
//   const [curUser,setcurUser]=useState(undefined);
//   const [chat, setchat] = useState(undefined);
//   const [loaded,setLoaded]=useState(false);
//   useEffect(async () => {
//     if (!localStorage.getItem("circlify")) {
//       navigate("/login");
//     } else {
//       setcurUser(
//         await JSON.parse(
//           localStorage.getItem("circlify")
//         )
//       );
//       setLoaded(true);
//     }
//   }, []);
//   useEffect(async () => {
//     if (curUser) {
//       if (curUser.isAvatarImageSet) {
//         const data = await axios.get(`http://localhost:5000/api/auth/contacts/${curUser._id}`);
//         setContacts(data.data);
//       } else {
//         navigate("/avatar");
//       }
//     }
//   }, [curUser]);
//   const handleChange = (contact) => {
//     setchat(contact);
//   };
//   return (
//     <>
//     <Container>
//     <div className="container">
//           <Contacts contacts={contacts} curUser={curUser} changeChat={handleChange}/>
//           {loaded&&chat===undefined?(
//                       <Home curUser={curUser}/>

//           ):(
            
//             <Chat chat={chat} curUser={curUser}/>
//           )}
//         </div>
  
//     </Container>
//     </>
//   )
// }
// const Container = styled.div`
//   height: 100vh;
//   width: 100vw;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   gap: 1rem;
//   align-items: center;
//   background-color: #131324;
//   .container {
//     height: 85vh;
//     width: 85vw;
//     background-color: #00000076;
//     display: grid;
//     grid-template-columns: 25% 75%;
//     @media screen and (min-width: 720px) and (max-width: 1080px) {
//       grid-template-columns: 35% 65%;
//     }
//   }
// `;
