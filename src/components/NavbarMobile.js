import React, { useState } from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useCurrentUser } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const NavbarMobile = () => {
  const navigate = useNavigate();
  const { user } = useCurrentUser();
  const [value, setValue] = useState(0);

  const goTo = () => {
    if (user) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  return (
    <Box
      sx={{
        width: "auto",
        "& .MuiBottomNavigation-root": {
          backgroundColor: "#F5044C",
          boxShadow: "0px -0.5px 0px rgba(0, 0, 0, 0.3)",
          backdropFilter: "blur(27.1828px)",
        },
        "& .MuiBottomNavigationAction-root.Mui-selected": {
          color: "white",
          opacity: "1",
        },
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <Link to="/">
          <BottomNavigationAction
            sx={{
              color: "white",
              opacity: "0.5",
            }}
            label="Home"
            icon={<HomeOutlinedIcon />}
          />
        </Link>

        <Link to="/favorite">
          <BottomNavigationAction
            sx={{
              color: "white",
              opacity: "0.5",
            }}
            label="Watchlist"
            icon={<BookmarkAddOutlinedIcon />}
          />
        </Link>

        <Link to="/categories">
          <BottomNavigationAction
            label="Explore"
            sx={{
              color: "white",
              opacity: "0.5",
            }}
            icon={<SearchOutlinedIcon />}
          />
        </Link>

        <Try>
          <BottomNavigationAction
            onClick={goTo}
            label="Profile"
            sx={{
              color: "white",
              opacity: "0.5",
            }}
            icon={<AccountCircleOutlinedIcon />}
          />
        </Try>
      </BottomNavigation>
    </Box>
  );
};

const Try = styled.div``;

export default NavbarMobile;
