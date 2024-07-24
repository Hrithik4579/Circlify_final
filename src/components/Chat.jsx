import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Message from "./Message";
import Logout from "./Logout";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

export default function Chat({ curChat, socket }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem("circlify")
    );
    const response = await axios.post("http://localhost:5000/api/messages/getmsg", {
      from: data._id,
      to: curChat._id,
    });
    setMessages(response.data);
  }, [curChat]);

  useEffect(() => {
    const getcurChat = async () => {
      if (curChat) {
        await JSON.parse(
          localStorage.getItem("circlify")
        )._id;
      }
    };
    getcurChat();
  }, [curChat]);

  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(
      localStorage.getItem("circlify")
    );
    socket.current.emit("send-msg", {
      to: curChat._id,
      from: data._id,
      msg,
    });
    await axios.post("http://localhost:5000/api/messages/addmsg", {
      from: data._id,
      to: curChat._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${curChat.avatarImage}`}
              alt=""
            />
          </div>
          <div className="username">
            <h3>{curChat.username}</h3>
          </div>
        </div>
        <Logout />
      </div>
      <div className="chat-messages">
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${
                  message.fromSelf ? "sended" : "recieved"
                }`}
              >
                <div className="content ">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Message handleSendMsg={handleSendMsg} />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`;

// import React, { useState, useEffect, useRef } from "react";
// import styled from "styled-components";
// import Message from "./Message";
// import Logout from "./Logout";
// import { v4 as uuidv4 } from "uuid";
// import axios from "axios";
// // import { sendMessageRoute, recieveMessageRoute } from "../utils/APIRoutes";

// export default function ChatContainer({ curChat, socket }) {
//   const [messages, setMessages] = useState([]);
//   const scrollRef = useRef();
//   const [arrivalMessage, setArrivalMessage] = useState(null);

//   useEffect(async () => {
//     const data = await JSON.parse(
//       localStorage.getItem("circlify")
//     );
//     const response = await axios.post("http://localhost:5000/api/messages/getmsg", {
//       from: data._id,
//       to: curChat._id,
//     });
//     setMessages(response.data);
//   }, [curChat]);

//   useEffect(() => {
//     const getcurChat = async () => {
//       if (curChat) {
//         await JSON.parse(
//           localStorage.getItem("circlify")
//         )._id;
//       }
//     };
//     getcurChat();
//   }, [curChat]);

//   const handleSendMsg = async (msg) => {
//     const data = await JSON.parse(
//       localStorage.getItem("circlify")
//     );
//     socket.current.emit("send-msg", {
//       to: curChat._id,
//       from: data._id,
//       msg,
//     });
//     await axios.post("http://localhost:5000/api/messages/addmsg", {
//       from: data._id,
//       to: curChat._id,
//       message: msg,
//     });

//     const msgs = [...messages];
//     msgs.push({ fromSelf: true, message: msg });
//     setMessages(msgs);
//   };

//   useEffect(() => {
//     if (socket.current) {
//       socket.current.on("msg-recieve", (msg) => {
//         setArrivalMessage({ fromSelf: false, message: msg });
//       });
//     }
//   }, []);

//   useEffect(() => {
//     arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
//   }, [arrivalMessage]);

//   useEffect(() => {
//     scrollRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return (
//     <Container>
//       <div className="chat-header">
//         <div className="user-details">
//           <div className="avatar">
//             <img
//               src={`data:image/svg+xml;base64,${curChat.avatarImage}`}
//               alt=""
//             />
//           </div>
//           <div className="username">
//             <h3>{curChat.username}</h3>
//           </div>
//         </div>
//         <Logout />
//       </div>
//       <div className="chat-messages">
//         {messages.map((message) => {
//           return (
//             <div ref={scrollRef} key={uuidv4()}>
//               <div
//                 className={`message ${
//                   message.fromSelf ? "sended" : "recieved"
//                 }`}
//               >
//                 <div className="content ">
//                   <p>{message.message}</p>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//       <Message handleSendMsg={handleSendMsg} />
//     </Container>
//   );
// }

// const Container = styled.div`
//   display: grid;
//   grid-template-rows: 10% 80% 10%;
//   gap: 0.1rem;
//   overflow: hidden;
//   @media screen and (min-width: 720px) and (max-width: 1080px) {
//     grid-template-rows: 15% 70% 15%;
//   }
//   .chat-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     padding: 0 2rem;
//     .user-details {
//       display: flex;
//       align-items: center;
//       gap: 1rem;
//       .avatar {
//         img {
//           height: 3rem;
//         }
//       }
//       .username {
//         h3 {
//           color: white;
//         }
//       }
//     }
//   }
//   .chat-messages {
//     padding: 1rem 2rem;
//     display: flex;
//     flex-direction: column;
//     gap: 1rem;
//     overflow: auto;
//     &::-webkit-scrollbar {
//       width: 0.2rem;
//       &-thumb {
//         background-color: #ffffff39;
//         width: 0.1rem;
//         border-radius: 1rem;
//       }
//     }
//     .message {
//       display: flex;
//       align-items: center;
//       .content {
//         max-width: 40%;
//         overflow-wrap: break-word;
//         padding: 1rem;
//         font-size: 1.1rem;
//         border-radius: 1rem;
//         color: #d1d1d1;
//         @media screen and (min-width: 720px) and (max-width: 1080px) {
//           max-width: 70%;
//         }
//       }
//     }
//     .sended {
//       justify-content: flex-end;
//       .content {
//         background-color: #4f04ff21;
//       }
//     }
//     .recieved {
//       justify-content: flex-start;
//       .content {
//         background-color: #9900ff20;
//       }
//     }
//   }
// `;
