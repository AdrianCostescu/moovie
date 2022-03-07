import React, { useState } from "react";
import { useCurrentUser } from "../../context/UserContext";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { color } from "../../styles/color";
import userIcon from "../../img/user.png";

function Avatar() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const { user, resetState } = useCurrentUser();
  console.log(user);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteLocalStorge = () => {
    window.localStorage.removeItem("user");
    navigate("/login");
    resetState();
  };

  const toMyProfile = () => {
    navigate("/profile");
  };

  return (
    <>
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
        {user && <Icon src={user?.avatar}></Icon>}
        {!user && <Icon src={userIcon}></Icon>}
        <Name>{user ? user?.name : "No User"}</Name>
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
        <MenuItem sx={{ width: "176px" }} onClick={deleteLocalStorge}>
          {user ? "Log out" : "Login"}
        </MenuItem>
        <MenuItem onClick={toMyProfile}>My Profile</MenuItem>
      </Menu>
    </>
  );
}

const Name = styled.h1`
  font-size: 16px;
  line-height: 22px;
  color: ${color.white};
  opacity: 0.4;
  margin-right: 5px;
`;

const Icon = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-color: ${color.white};
  border: 2px solid #f5044c;
  margin-right: 16px;
`;
export default Avatar;
