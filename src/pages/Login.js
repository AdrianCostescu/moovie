import React, { useState } from "react";
import {
  RegisterPage,
  Logo,
  ContentBox,
  Title,
  Form,
  Input,
  Button,
  Text,
} from "./Register";
import logo from "../img/moovie-watchers_logo.png";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <RegisterPage>
      <Logo src={logo} alt="logo"></Logo>
      <ContentBox>
        <Title>Log in to your account</Title>
        <Form>
          <Input
            type="email"
            placeholder="Email adress"
            required
            value={email}
            onChange={(e) => setEmail(email)}
          ></Input>
          <Input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(password)}
          ></Input>
          <Reset>
            <Link to="/reset">Forgot password?</Link>
          </Reset>
        </Form>
        <Button>Log in</Button>
        <Text>
          Don’t have an account? <Link to="/register">Let’s create one</Link>
        </Text>
      </ContentBox>
    </RegisterPage>
  );
};

const Reset = styled.p`
  width: 368px;
  height: 30px;
  color: #9c9b9b;
  font-size: 14px;
  line-height: 80px;
  display: flex;
  justify-content: end;
  align-items: flex-end;

  a {
    color: #9c9b9b;
    text-decoration: none;
  }
`;

export default Login;
