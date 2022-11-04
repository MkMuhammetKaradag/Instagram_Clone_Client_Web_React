import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import InstagramProvider from "./context/InstagramProvider";
import ReactDOM from "react-dom";
const container = document.getElementById("root")!;
const root = createRoot(container);
const rootElement = document.getElementById("root");

root.render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
    <InstagramProvider>
      <App />
    </InstagramProvider>

    {/* </Provider> */}
  </React.StrictMode>
);

// ReactDOM.render(
//   <InstagramProvider>
//     <App />
//   </InstagramProvider>,
//   rootElement
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
