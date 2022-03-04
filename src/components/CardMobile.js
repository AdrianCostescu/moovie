import React from "react";
import styled from "styled-components";
import { color } from "../styles/color";
import { Link } from "react-router-dom";

const CardMobile = ({ id, title, release, img }) => {
  return (
    <Link to={"/movies/" + id}>
      <CardMobileBox>
        <ImgCard src={img}></ImgCard>
        <Title>{title}</Title>
        <Data>{release}</Data>
      </CardMobileBox>
    </Link>
  );
};

const CardMobileBox = styled.div`
  width: 128px;
  border-radius: 20px;
`;

const ImgCard = styled.img`
  width: 128px;
  height: 152px;
  border-radius: 20px;
`;

const Title = styled.h1`
  height: 36px;
  font-size: 18px;
  line-height: 18px;
  letter-spacing: -0.08px;
  color: ${color.white};
  margin: 0px auto;
  margin-top: 14px;
`;

const Data = styled.p`
  font-size: 13px;
  line-height: 18px;
  letter-spacing: -0.08px;
  color: #979797;
  margin: 0px auto;
`;

export default CardMobile;
