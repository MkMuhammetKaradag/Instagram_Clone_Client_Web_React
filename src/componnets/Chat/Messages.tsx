import React from "react";
import Message from "./Message";
import ScrollToBottom from "react-scroll-to-bottom";
type MessagesProps = {
  messages: {
    from: {
      id: string;
      name: string;
      username: string;
      avatar: string;
    };
    message: string;
  }[];
};

const Messages = ({ messages }: MessagesProps) => {
  return (
    <ScrollToBottom className="h-[calc(100%-154px)]  pb-0 p-4 overflow-auto  messages-box">
      <div className="mb-auto"></div>
      {messages.map((message, key) => (
        <Message message={message} key={key}></Message>
      ))}
    </ScrollToBottom>
  );
};

export default Messages;
