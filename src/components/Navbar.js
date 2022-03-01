import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../img/moovie-watchers_logo.png";
import { Badge } from "./Badge";

const NavbarBox = styled.div`
  height: 144px;
  background-color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
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

const Navbar = () => {
  return (
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
  );
};

export default Navbar;
