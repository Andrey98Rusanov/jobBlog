import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App/App';
import { Provider } from 'react-redux';
import { createStore } from "redux";

const defaultState = {
  articles: [],
  page: 1,
  totalPage: 50
}

const reducer = (state = defaultState, action) => {
    switch (action.type) {
      case "ADD_ARTICLES":
        return {...state, articles: action.payload.articles}
      case "CHANGE_PAGE":
        return {...state, page: action.payload}
      case "ADD_TOTAL":
        return {...state, totalPage: action.payload.articlesCount/5}
        default:
          return state
    }
}

const store = createStore(reducer)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
);

