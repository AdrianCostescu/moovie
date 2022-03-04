import React, { useState } from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { Link } from "react-router-dom";

const NavbarMobile = () => {
  const [value, setValue] = useState(0);

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

        <Link to="/">
          <BottomNavigationAction
            label="Explore"
            sx={{
              color: "white",
              opacity: "0.5",
            }}
            icon={<SearchOutlinedIcon />}
          />
        </Link>
      </BottomNavigation>
    </Box>
  );
};

export default NavbarMobile;
