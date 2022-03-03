import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../img/moovie-watchers_logo.png";
import facebook from "../img/Vector.png";
import twiter from "../img/Vector2.png";
import youtube from "../img/Vector3.png";

const Footer = () => {
  return (
    <FooterBox>
      <FooterMain>
        <Logo src={logo}></Logo>
        <TextAlign>
          <TextAlignColumn>
            <Text>Press Room</Text>
            <Text>Advertising</Text>
            <Text>Jobs</Text>
          </TextAlignColumn>
          <TextAlignColumn>
            <Text>Contact Us</Text>
            <Text>
              <Link to="/register">Register</Link>
            </Text>
            <Text>News</Text>
          </TextAlignColumn>
          <TextAlignColumn>
            <Text>Conditions of Use</Text>
            <Text>Privacy Policy</Text>
            <Text>Interest-Based Ads</Text>
          </TextAlignColumn>
        </TextAlign>
      </FooterMain>
      <SecondBox>
        <TextL>Copyright © 1990-2019 Moovie.com, Inc.</TextL>
        <Icons>
          <Text>Follow us on social media</Text>
          <BackgrounIcon>
            <Icon src={facebook} />
          </BackgrounIcon>
          <BackgrounIcon>
            <Icon src={twiter} />
          </BackgrounIcon>
          <BackgrounIcon>
            <Icon src={youtube} />
          </BackgrounIcon>
        </Icons>
      </SecondBox>
    </FooterBox>
  );
};

const FooterBox = styled.div`
  height: 352px;
  width: 100%;
  background-color: #010102;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const FooterMain = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: 152px;
  margin-left: 152px;
`;

const SecondBox = styled.div`
  height: 91px;
  border-top: 1px solid #fff;
  margin-left: 152px;
  margin-right: 152px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.img`
  width: 257px;
  height: 57px;
  margin-top: 68px;
`;

const Text = styled.p`
  width: 184px;
  height: 43px;
  font-size: 14px;
  line-height: 42px;
  color: #fff;

  a {
    color: #fff;
    text-decoration: none;
  }
`;

const TextAlign = styled.div`
  display: flex;
  margin-top: 56px;
`;

const TextAlignColumn = styled.div``;

const TextL = styled.p`
  width: 375px;
  height: 43px;
  font-size: 14px;
  line-height: 42px;
  color: #fff;
  opacity: 0.7;
`;

const Icon = styled.img``;

const Icons = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

const BackgrounIcon = styled.div`
  height: 32px;
  width: 32px;
  border-radius: 25px;
  background-color: #f5044c;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Footer;
