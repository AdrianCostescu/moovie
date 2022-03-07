import React from "react";
import styled from "styled-components";
import { color } from "../styles/color";
import logo from "../img/moovie-watchers_logo.png";
import Menu from "@mui/material/Menu";
import Avatar from "./core/Avatar";

const NavbarAdmin = () => {
  return (
    <NavbarBox>
      <Logo src={logo}></Logo>
      <RightPosition>
        <Menu>Movies</Menu>
        <Avatar></Avatar>
      </RightPosition>
    </NavbarBox>
  );
};

const NavbarBox = styled.div`
  height: 118px;
  width: 100%;
  background-color: ${color.ebony};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.img`
  height: 40px;
  margin-left: 152px;
`;

const RightPosition = styled.div`
  display: flex;
  margin-right: 152px;
`;

export default NavbarAdmin;
