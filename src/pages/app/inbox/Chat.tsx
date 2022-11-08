import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ChatMessage, getChatMessages, messageType } from "../../../api";
import Header from "../../../componnets/Chat/Header";
import Messages from "../../../componnets/Chat/Messages";
import Reply from "../../../componnets/Chat/Reply";
import { WebSocketContext } from "../../../context/WebSocketContext";
type MessagePayload = {
  message: ChatMessage;
  type: string;
};
const Chat = () => {
  // const [messages, setMessages] = useState([
  //   {
  //     from: {
  //       id: "63578f6761e297c1a19c1b70",
  //       name: "muhammet",
  //       username: "deneme",
  //       avatar:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfm8UnQUb93iMa_J1a9GuKRJ1LWIzTD8dxrA&usqp=CAU",
  //     },
  //     message: "test deneme!",
  //   },
  //   {
  //     from: {
  //       id: "2",
  //       name: "ali",
  //       username: "ali!",
  //       avatar:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3J9vtPDCVupM4zSB6IBvw0J9zcE-5Ma4OCA&usqp=CAU",
  //     },
  //     message: "test  mami!!!!!",
  //   },
  //   {
  //     from: {
  //       id: "2",
  //       name: "ali",
  //       username: "ali!",
  //       avatar:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3J9vtPDCVupM4zSB6IBvw0J9zcE-5Ma4OCA&usqp=CAU",
  //     },
  //     message: "deneme mami!",
  //   },
  //   {
  //     from: {
  //       id: "63578f6761e297c1a19c1b70",
  //       name: "muhammet",
  //       username: "deneme",
  //       avatar:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfm8UnQUb93iMa_J1a9GuKRJ1LWIzTD8dxrA&usqp=CAU",
  //     },
  //     message:
  //       "of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  //   },
  // ]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const { chatId } = useParams();
  const [messages_1, setMessages_1] = useState<messageType[]>([]);
  const socket = useContext(WebSocketContext);
  useEffect(() => {
    // console.log("geldi");
    socket.connect();
    socket.on("connection", () => {
      console.log("çalışmıyorrrr!");
    });
    socket.on("disconnect", (reason) => {
      console.log("amantanrım");
    });
    socket.on("onMessage", (newMessage: MessagePayload) => {
      // console.log("onMessage event Reciver!");
      console.log("new messaga", newMessage);
      setMessages((prev) => [...prev, newMessage.message]);
      // setMessages_1((prev) => [...prev, newMessage.content]);
    });
    // socket.on("disconnect", () => {
    //   console.log("Disconnected");
    // });
    return () => {
      // console.log("Unregistering Events...");
      socket.off("connect");
      socket.off("onMessage");
      socket.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    socket.emit("join", chatId);
    getChatMessages(chatId as string).then((res) => {
      if (res.data.messages.Messages) {
        setMessages(res.data.messages.Messages);
      }
    });
    // console.log("asas", chatId);
  }, [chatId]);

  return (
    <div className="flex-1">
      <Header></Header>
      <Messages messages={messages}></Messages>
      <Reply setMessages={setMessages}></Reply>
    </div>
  );
};

export default Chat;
