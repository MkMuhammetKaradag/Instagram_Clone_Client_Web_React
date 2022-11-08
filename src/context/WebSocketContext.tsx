import React, { createContext } from "react";
import { io, Socket } from "socket.io-client";

export const socket = io("http://localhost:8080", {
  withCredentials: true,
  transports: ["websocket", "polling"],
});
interface WebSocketProviderProps {
  children: React.ReactElement<any>;
}

export const WebSocketContext = createContext<Socket>(socket);
export const WebSocketProvider = WebSocketContext.Provider;
