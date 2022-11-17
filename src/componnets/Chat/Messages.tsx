import React, { useEffect, useState } from "react";
import Message from "./Message";
import ScrollToBottom from "react-scroll-to-bottom";
import { ChatMessage, getChatMessages } from "../../api";
import { useParams } from "react-router-dom";
import { enterScope } from "immer/dist/internal";
type MessagesProps = {
  messages: ChatMessage[];
};

const Messages = ({ messages }: MessagesProps) => {
  // const [messages, setMessages] = useState<ChatMessage[]>();
  const { chatId } = useParams();
  // useEffect(() => {
  //   getChatMessages(chatId as string).then((res) => {
  //     if (res.data.messages.Messages) {
  //       setMessages(res.data.messages.Messages);
  //     }
  //   });
  // }, []);
  return (
    <ScrollToBottom className="h-[calc(100%-154px)]    pb-0 p-4 overflow-auto  messages-box">
      <div className="mb-auto"></div>
      {messages &&
        messages.map((message, key) => (
          <Message message={message} key={key}></Message>
        ))}
    </ScrollToBottom>
  );
};

export default Messages;
