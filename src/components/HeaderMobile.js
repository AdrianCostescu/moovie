import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";
import styled from "styled-components";
import { color } from "../styles/color";
import { Error } from "./Header";
import play from "../img/play.png";
import logo from "../img/moovie-watchers_logo.png";

const HeaderMobile = ({ loading, error, movies, random }) => {
  return (
    <HeaderMobileBox>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Error>There was a network error. Please try again.</Error>
      ) : (
        <>
          <Logo src={logo}></Logo>
          <Title>Watch anywhere.</Title>
          <SubTitle>
            Keep up to date about what movies will be realeased in the next
            couple of months.{" "}
          </SubTitle>
          <Card>
            <Link to={"/movies/" + movies[random].id}>
              <Img src={movies[random].image[0]}></Img>
            </Link>
            <Name>{movies[random].title}</Name>
            <Type>
              {movies[random].type.join(" • ")}
              <Span> • {movies[random].time}</Span>
            </Type>
            <Icon src={play}></Icon>
          </Card>
        </>
      )}
    </HeaderMobileBox>
  );
};

const HeaderMobileBox = styled.div`
  width: 100%;
  background-color: ${color.black};
  display: flex;
  flex-direction: column;
`;

const Logo = styled.img`
  width: 157px;
  margin: 0 auto;
  margin-top: 37px;
`;

const Title = styled.h1`
  width: 90%;
  margin: 0 auto;
  font-size: 34px;
  line-height: 41px;
  letter-spacing: 0.41px;
  color: ${color.white};
  margin-top: 47px;
`;

const SubTitle = styled.p`
  width: 90%;
  margin: 0 auto;
  font-size: 13px;
  line-height: 18px;
  letter-spacing: -0.08px;
  color: #979797;
  margin-top: 9px;
  margin-bottom: 53px;
`;

const Card = styled.div`
  width: 90%;
  height: 250px;
  border-radius: 20px;
  margin: 0 auto;
  position: relative;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 20px;
  opacity: 0.5;
`;

const Name = styled.h1`
  width: 100%;
  font-size: 23px;
  line-height: 60px;
  color: ${color.white};
  position: absolute;
  top: 140px;
  left: 16px;
`;

const Type = styled.p`
  font-size: 13px;
  line-height: 16px;
  color: ${color.white};
  position: absolute;
  top: 192px;
  left: 16px;
`;

const Span = styled.span`
  font-size: 13px;
  line-height: 16px;
  color: ${color.white};
`;

const Icon = styled.img`
  height: 50px;
  width: 50px;
  position: absolute;
  top: 100px;
  left: 45%;
`;

export default HeaderMobile;
