import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../img/moovie-watchers_logo.png";
import { Badge } from "./Badge";
import NavbarMobile from "./NavbarMobile";

const Navbar = () => {
  return (
    <>
      <NavbarVisibilityMain>
        <NavbarBox>
          <ListMenu>
            <Text>
              <Link to="/">Home</Link>
            </Text>
            <Text>Categories</Text>
          </ListMenu>
          <Logo src={logo} alt="logo" />
          <ListMenu>
            <Badge count={3}>
              <Text>
                <Link to="/favorite">Watchlist</Link>
              </Text>
            </Badge>
            <Text>Contact</Text>
          </ListMenu>
        </NavbarBox>
      </NavbarVisibilityMain>
      <NavbarVisibility>
        <NavbarMobile />
      </NavbarVisibility>
    </>
  );
};

const NavbarVisibility = styled.div`
  display: none;
  @media only screen and (max-width: 850px) {
    display: block;
    visibility: visible;
    position: fixed;
    bottom: 0px;
    left: 0;
    right: 0;
  }
`;

const NavbarVisibilityMain = styled.div`
  visibility: visible;
  @media only screen and (max-width: 850px) {
    // visibility: hidden;
    display: none;
  }
`;

const NavbarBox = styled.div`
  height: 144px;
  background-color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;

  @media only screen and (max-width: 850px) {
    justify-content: center;
  }
`;

const ListMenu = styled.div`
  display: flex;
  margin-left: 152px;
  margin-right: 152px;
  gap: 80px;
  line-height: 22px;
`;

const Logo = styled.img`
  width: 257px;
  height: 57px;
`;

const Text = styled.p`
  //border-bottom: 1px solid #fff;
  display: flex;

  a {
    color: #fff;
    text-decoration: none;
  }
`;

export default Navbar;
