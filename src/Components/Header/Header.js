import { useDispatch, useSelector } from "react-redux";
import Api from "../../Api/Api";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Header() {
  const api = new Api();
  const navigate = useNavigate();
  const logIn = useSelector((state) => state.logIn);
  const currentUser = useSelector(state => state.currentUser)
  const dispatch = useDispatch();
  useEffect(() => {
    api.getCurrentUser().then((res) => {
      if (res) {
        dispatch({type: "ADD_USER", payload: res.user})
      }
    });
  }, [currentUser]);
  const logOut = () => {
    dispatch({ type: "LOG_OUT" });
    window.localStorage.removeItem("token");
    navigate("/");
  };
  const headerButtons = logIn ? (
    <div className="header_buttons">
      <Link to="/new-article" className="header_button">
        Create Article
      </Link>
      <Link to="/edit-profile" className="userData">{currentUser.username}
      <img src={currentUser.image || `https://static.productionready.io/images/smiley-cyrus.jpg`}/></Link>
      <button className="header_button button" onClick={() => logOut()}>
        Log Out
      </button>
    </div>
  ) : (
    <div className="header_buttons">
      <Link to="/sign-in" className="header_button">
        Sign in
      </Link>
      <Link to="/create-account" className="header_button">
        Sign up
      </Link>
    </div>
  );
  return (
    <div className="header">
      <Link to="/" className="logo">
        Realworld Blog
      </Link>
      {headerButtons}
    </div>
  );
}

export default Header;
