import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Card = ({ title, type, score, img, release, id }) => {
  return (
    <CardBox>
      <Link to={"/movies/" + id}>
        <ImgBox img={img}></ImgBox>
      </Link>
      <ButtonPosition>
        <ButtonWatch>Add to watchlist</ButtonWatch>
        <Nota>{score}</Nota>
      </ButtonPosition>
      <Link to={"/movies/" + id}>
        <Title>{title}</Title>
        <SubTitle>
          Realeased date: {release} {type?.join(" • ")}
        </SubTitle>
      </Link>
    </CardBox>
  );
};

const CardBox = styled.div`
  height: auto;
`;

const ImgBox = styled.div`
  background-image: ${(props) => `url(${props.img})`};
  background-size: cover;
  width: 272px;
  height: 416px;
  border-radius: 20px;
  display: flex;
  align-items: flex-end;
  justify-content: end;
`;

const ButtonWatch = styled.button`
  appearance: none;
  background: none;
  border: none;
  outline: none;
  width: 106px;
  height: 32px;
  background-color: #f5044c;
  border-radius: 5px;
  font-size: 10px;
  line-height: 14px;
  color: #fff;
`;

const Nota = styled.div`
  width: 24px;
  height: 24px;
  background-color: #ff9a03;
  boreder-radius: 5px;
  font-size: 10px;
  line-height: 80px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonPosition = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  margin-left: 103px;
  margin-top: -56px;
`;

const Title = styled.h1`
  width: 272px;
  height: 48px;
  font-size: 18px;
  line-height: 80px;
  color: #fff;
  display: flex;
  align-items: center;
  margin-top: 24px;
`;

const SubTitle = styled.p`
  width: 202px;
  font-size: 14px;
  line-height: 19px;
  opacity: 0.5;
  color: #fff;
  margin-top: -15px;
  text-decoration: none;
`;

export default Card;
