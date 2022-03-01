import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../img/moovie-watchers_logo.png";

export const RegisterPage = styled.div`
  background-color: #010103;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Logo = styled.img`
  width: 257px;
  height: 57px;
  margin-top: 107px;
  margin-bottom: 41px;
`;

export const ContentBox = styled.div`
  background-color: #0a0a0a;
  height: 711px;
  width: 560px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-top: 8px solid #212128;
  margin-bottom: 108px;
`;

export const Title = styled.h1`
  width: 300px;
  height: 144px;
  color: #fff;
  font-size: 48px;
  line-height: 60px;
  text-align: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 95px;
`;

export const Input = styled.input`
  appearance: none;
  background: none;
  border: none;
  outline: none;
  width: 367px;
  height: 48px;
  border: 1px solid #9c9b9b;
  box-sizing: border-box;
  border-radius: 8px;
  color: white;

  ::placeholder {
    font-family: SF Pro Display;
    font-size: 18px;
    line-height: 21px;
    color: #9c9b9b;
    padding-left: 16px;
  }
`;

export const Button = styled.button`
  appearance: none;
  background: none;
  border: none;
  outline: none;
  width: 367px;
  height: 48px;
  background-color: #f5044c;
  border-radius: 8px;
  margin-top: 89px;
  font-size: 18px;
  line-height: 25px;
  color: #fff;
`;

export const Text = styled.p`
  color: #9c9b9b;
  font-size: 14px;
  line-height: 80px;

  a {
    color: #9c9b9b;
  }
`;

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <RegisterPage>
      <Logo src={logo} alt="logo"></Logo>
      <ContentBox>
        <Title>Let's create your account</Title>
        <Form>
          <Input
            type="text"
            placeholder="Full name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Input>
          <Input
            type="email"
            placeholder="Email adress"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Input>
          <Input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
        </Form>
        <Button>Register</Button>
        <Text>
          Already have an account? <Link to="/login">Log in</Link>
        </Text>
      </ContentBox>
    </RegisterPage>
  );
};

export default Register;
