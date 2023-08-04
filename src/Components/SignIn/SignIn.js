import React from "react";
import "./SignIn.css";
import Api from "../../Api/Api";
import Loader from "../UI-Component/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input } from "antd";
const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const api = new Api();
  const isLoad = useSelector(state => state.isLoad)
  const onFinish = (values) => {
    dispatch({type: "LOAD_CHANGE", payload: true})
    api.logIn({ email: values.email, password: values.password }).then((res) => {
      dispatch(dispatch({type: "ADD_USER", payload: res.user}))
      dispatch({ type: "LOG_IN" });
      dispatch({type: "LOAD_CHANGE", payload: false})
      navigate("/");
    });
  };
  return (
    isLoad ? <Loader/> :
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <h1 className="sign-in_title">Sign In</h1>
      Email address
      <Form.Item
        name="email"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      Password
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
          {
            required: true,
            message: "Your password must to be within 6 to 40 characters.",
            whitespace: true,
            min: 6,
            max: 40,
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>
      <div className="sign-in_buttons" style={{marginLeft: 30}}>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <Link to="/create-account">register now!</Link>
      </div>
    </Form>
  );
};
export default SignIn;
