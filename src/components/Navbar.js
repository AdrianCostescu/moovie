import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import logo from "../img/moovie-watchers_logo.png";
import { Badge } from "./Badge";
import NavbarMobile from "./NavbarMobile";
import { useCurrentUser } from "../context/UserContext";
import Avatar from "./core/Avatar";
import { color } from "../styles/color";

const NAVBAR_ITEMS = {
  main: {
    id: "main",
    label: "Home",
    path: "/",
  },
  favorite: {
    id: "favorite",
    label: "Watchlist",
    path: "/favorite",
  },
  categories: {
    id: "categories",
    label: "Categories",
    path: "/categories",
  },
};

const Navbar = () => {
  const { user } = useCurrentUser();
  const location = useLocation();

  return (
    <>
      <NavbarVisibilityMain>
        <NavbarBox>
          <ListMenu>
            <Text>
              <StyledLink
                isActive={location.pathname === NAVBAR_ITEMS.main.path}
                to={NAVBAR_ITEMS.main.path}
              >
                {NAVBAR_ITEMS.main.label}
              </StyledLink>
            </Text>
            <Text>
              <StyledLink
                isActive={location.pathname === NAVBAR_ITEMS.categories.path}
                to={NAVBAR_ITEMS.categories.path}
              >
                {NAVBAR_ITEMS.categories.label}
              </StyledLink>
            </Text>
          </ListMenu>
          <Logo src={logo} alt="logo" />
          <ListMenu>
            <Badge count={user?.favoriteMoviesIds?.length}>
              <Text>
                <StyledLink
                  isActive={location.pathname === NAVBAR_ITEMS.favorite.path}
                  to={NAVBAR_ITEMS.favorite.path}
                >
                  {NAVBAR_ITEMS.favorite.label}
                </StyledLink>
              </Text>
            </Badge>
            <Avatar></Avatar>
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
  justify-content: space-between;
  margin-left: 10%;
  margin-right: 10%;
  gap: 80px;
  line-height: 22px;
`;

const Logo = styled.img`
  width: 257px;
  height: 57px;
`;

const Text = styled.p`
  display: flex;

  a {
    color: #fff;
    text-decoration: none;
  }
`;

const StyledLink = styled(Link)`
  border-bottom: ${(props) => props.isActive && `1px solid ${color.white} `};
  padding-bottom: 5px;
`;

export default Navbar;
