import React, { useState } from "react";
import styled from "styled-components";
import { color } from "../styles/color";
import user from "../img/user.png";
import logo from "../img/moovie-watchers_logo.png";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IoIosArrowDown } from "react-icons/io";

const NavbarAdmin = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <NavbarBox>
      <Logo src={logo}></Logo>
      <RightPosition>
        <Menu>Movies</Menu>
        <Button
          sx={{
            color: "#fff",
            textTransform: "none",
            fontSize: "16px",
          }}
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <Icon src={user}></Icon>
          <Name>Matthew</Name>
          <IoIosArrowDown
            color="white"
            fontSize="22px"
            opacity="0.4"
          ></IoIosArrowDown>
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem sx={{ width: "176px" }} onClick={handleClose}>
            Log out
          </MenuItem>
        </Menu>
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

const Icon = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-color: ${color.white};
  border: 2px solid #f5044c;
  margin-right: 16px;
`;

const RightPosition = styled.div`
  display: flex;
  margin-right: 152px;
`;

const Name = styled.h1`
  font-size: 16px;
  line-height: 22px;
  color: ${color.white};
  opacity: 0.4;
  margin-right: 5px;
`;

export default NavbarAdmin;
