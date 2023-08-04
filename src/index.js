import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./Components/App/App";
import { Provider } from "react-redux";
import { createStore } from "redux";

const defaultState = {
  isLoad: true,
  articles: [],
  page: 1,
  totalPage: 50,
  logIn: false,
  currentUser: {username: ""}
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "ADD_ARTICLES":
      return { ...state, articles: action.payload.articles };
    case "CHANGE_PAGE":
      return { ...state, page: action.payload };
    case "ADD_TOTAL":
      return { ...state, totalPage: action.payload.articlesCount / 5 };
    case "LOG_IN":
      return { ...state, logIn: true };
    case "LOG_OUT":
      return { ...state, logIn: false };
    case "LOAD_CHANGE":
      return {...state, isLoad: action.payload}
    case "ADD_USER":
      return {...state, currentUser: action.payload}
    default:
      return state;
  }
};

const store = createStore(reducer);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
