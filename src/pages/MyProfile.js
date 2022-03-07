import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { color } from "../styles/color";
import logo from "../img/moovie-watchers_logo.png";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useUpdateUserInfo } from "../hooks/useUpdateUserInfo";
import { useCurrentUser, UserContextProvider } from "../context/UserContext";

function MyProfileWithProviders({ children }) {
  return (
    <UserContextProvider>
      <MyProfile>{children}</MyProfile>
    </UserContextProvider>
  );
}

const MyProfile = () => {
  const { user, refetch, resetState } = useCurrentUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setPassword(user.password);
      setName(user.name);
      setAvatar(user.avatar);
    }
  }, [user]);

  const [updateUserInfo] = useUpdateUserInfo();

  async function updateUser() {
    if (!user) {
      return;
    }
    await updateUserInfo({
      variables: {
        id: user.id,
        input: {
          name,
          password,
          email,
          avatar,
        },
      },
    }).then(() => {
      refetch();
    });
  }

  const navigate = useNavigate();

  const deleteLocalStorge = () => {
    window.localStorage.removeItem("user");
    resetState();
    navigate("/login");
  };

  return (
    <ProfileBox>
      <Logo src={logo}></Logo>
      <Arrow onClick={() => navigate(-1)}>
        <ArrowBackIosIcon
          sx={{
            color: "white",
            fonstSize: "22px",
            position: "absolute",
            top: "38px",
            left: "22px",
          }}
        />
      </Arrow>
      <Arrow onClick={deleteLocalStorge}>
        <LogoutIcon
          sx={{
            color: "white",
            fonstSize: "22px",
            position: "absolute",
            top: "38px",
            right: "22px",
          }}
        ></LogoutIcon>
      </Arrow>
      <BoxProfile>
        <Title>My Profile</Title>
        <Icon src={user?.avatar}></Icon>

        <Form onSubmit={updateUser}>
          <Input
            type="text"
            placeholder="Change Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Input>
          <Input
            type="email"
            placeholder="Change Email adress"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Input>
          <Input
            type="password"
            placeholder="Change Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
          <Input
            type="text"
            placeholder="Change Avatar"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          ></Input>
          <Button type="submit">Save changes</Button>
        </Form>
      </BoxProfile>
    </ProfileBox>
  );
};

const ProfileBox = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: ${color.ebony};
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.img`
  height: 70px;
  width: 253px;
  margin-bottom: 41px;
  margin-top: 41px;
  @media only screen and (max-width: 850px) {
    display: none;
  }
`;

const BoxProfile = styled.div`
  max-width: 560px;
  border-top: 8px solid ${color.shark};
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${color.ebony};
  padding: 0px 95px 44px 95px;
  margin-bottom: 44px;
  @media only screen and (max-width: 850px) {
    background-color: ${color.ebony};
    margin: 0px;
    padding: 0px;
  }
`;

const Title = styled.h1`
  font-size: 48px;
  line-height: 60px;
  color: ${color.white};
  text-align: center;
  margin-top: 44px;
`;

const Icon = styled.img`
  background-color: ${color.white};
  height: 112px;
  width: 112px;
  border-radius: 50%;
  margin-top: 44px;
`;

const Text = styled.p`
  color: ${color.white};
  font-size: 13px;
  line-height: 16px;
  letter-spacing: 0.012em;
  text-decoration-line: underline;
  opacity: 0.8;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 44px;
`;

const Input = styled.input`
  appearance: none;
  background: none;
  border: none;
  outline: none;
  width: 367px;
  height: 48px;
  border: 1px solid ${color.dustyGray};
  box-sizing: border-box;
  border-radius: 8px;
  color: white;

  ::placeholder {
    font-family: SF Pro Display;
    font-size: 18px;
    line-height: 21px;
    color: ${color.dustyGray};
    padding-left: 16px;
  }
`;

const Button = styled.button`
  border: none;
  width: 367px;
  height: 48px;
  background-color: ${color.redRibbon};
  border-radius: 8px;
  color: ${color.white};
  margin-top: 44px;
`;

const Arrow = styled.div`
  visibility: hidden;
  @media only screen and (max-width: 850px) {
    visibility: visible;
  }
`;

export default MyProfileWithProviders;
