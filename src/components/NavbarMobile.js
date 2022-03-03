import React from "react";
import styled from "styled-components";
import { color } from "../styles/color";
import home from "../img/home.png";
import favorite from "../img/favorite.png";
import search from "../img/search.png";

const NavbarMobile = () => {
  return (
    <NavbarM>
      <IconPosition>
        <Icon src={home}></Icon>
        <Title>Home</Title>
      </IconPosition>
      <IconPosition>
        <Icon src={favorite}></Icon>
        <Title>Watchlist</Title>
      </IconPosition>
      <IconPosition>
        <Icon src={search}></Icon>
        <Title>Search</Title>
      </IconPosition>
    </NavbarM>
  );
};

const NavbarM = styled.div`
  height: 49px;
  width: 100%;
  background-color: ${color.redRibbon};
  position: absolute;
  bottom: 0px;
  display: flex;
`;

const IconPosition = styled.div`
  height: 49px;
  width: 125px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.p`
  height: 12px;
  margin: 0;
  font-size: 10px;
  line-height: 12px;
  color: ${color.white};
  margin-top: 7px;
`;

const Icon = styled.img`
  height: 20px;
  width: 22px;
`;

export default NavbarMobile;
