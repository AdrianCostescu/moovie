import React from "react";
import { Logo, Form, Input } from "./Register";
import logo from "../img/moovie-watchers_logo.png";
import styled from "styled-components";

const Reset = () => {
  return (
    <RegisterPage>
      <Logo src={logo} alt="logo"></Logo>
      <ContentBox>
        <Title>Reset password</Title>
        <SubText>
          We will send you over email the instructions in order to get your
          password reseted.
        </SubText>
        <Form>
          <Input type="email" placeholder="Email adress"></Input>
          <Button>Reset password</Button>
        </Form>
      </ContentBox>
    </RegisterPage>
  );
};

const SubText = styled.p`
  width: 346px;
  height: 40px;
  color: #9c9b9b;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  @media only screen and (max-width: 850px) {
    width: 310px;
    font-size: 14px;
    line-height: 17px;
    margin-top: 0px;
  }
`;

const RegisterPage = styled.div`
  height: 100vh;
  background-color: #010103;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 850px) {
    justify-content: start;
    align-items: center;
  }
`;

const ContentBox = styled.div`
  height: 560px;
  width: 463px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-top: 8px solid #212128;

  @media only screen and (max-width: 850px) {
    height: auto;
    width: 80%;
    margin: 0 auto;
    border: 0px;
    align-items: start;
    background-color: transparent;
  }
`;

const Title = styled.h1`
  width: 432px;
  height: 45px;
  color: #fff;
  font-size: 48px;
  line-height: 60px;
  text-align: center;
  margin-top: 44px;
  @media only screen and (max-width: 850px) {
    width: 310px;
    font-size: 24px;
    line-height: 29px;
    margin-top: 44px;
  }
`;

const Button = styled.button`
  appearance: none;
  background: none;
  border: none;
  outline: none;
  width: 367px;
  height: 48px;
  background-color: #f5044c;
  border-radius: 8px;
  margin-top: 27px;
  font-size: 18px;
  line-height: 25px;
  color: #fff;

  @media only screen and (max-width: 850px) {
    width: 310px;
    margin-top: 24px;
  }
`;

export default Reset;
