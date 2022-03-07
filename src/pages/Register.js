import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../img/moovie-watchers_logo.png";
import { useRegisterUser } from "../hooks/useRegisterUser";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { color } from "../styles/color";

const Register = () => {
  const [open, setOpen] = useState(false);
  const [addUser] = useRegisterUser();
  const [isAdmin, setIsAdmin] = useState(false);
  const [favoriteMoviesIds, setFavoriteMoviesIds] = useState([]);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const input = Object.fromEntries(formData);

    const response = await addUser({
      variables: {
        input: {
          ...input,
          isAdmin: isAdmin,
          favoriteMoviesIds: favoriteMoviesIds,
        },
      },
    })
      .catch((error) => {
        console.log(error);
        return error;
      })
      .then(handleClick);
  }

  return (
    <RegisterPage>
      <Logo src={logo} alt="logo"></Logo>
      <ContentBox>
        <Title>Let's create your account</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            name="name"
            type="text"
            placeholder="Full name"
            required
          ></Input>
          <Input
            name="email"
            type="email"
            placeholder="Email adress"
            required
          ></Input>
          <Input
            name="password"
            type="password"
            placeholder="Password"
            required
          ></Input>
          <Button type="submit">Register</Button>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              User successfully created
            </Alert>
          </Snackbar>
        </Form>
        <Text>
          Already have an account? <Link to="/login">Log in</Link>
        </Text>
      </ContentBox>
    </RegisterPage>
  );
};

export const RegisterPage = styled.div`
  background-color: ${color.ebony};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Logo = styled.img`
  width: 257px;
  height: 57px;
  margin-top: 107px;
  margin-bottom: 41px;
  @media only screen and (max-width: 850px) {
    margin-top: 52px;
  }
`;

export const ContentBox = styled.div`
  background-color: ${color.ebony};
  height: 711px;
  width: 560px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-top: 8px solid ${color.shark};
  margin-bottom: 108px;

  @media only screen and (max-width: 850px) {
    width: 80%;
    margin: 0 auto;
    border: 0px;
    align-items: start;
    background-color: transparent;
  }
`;

export const Title = styled.h1`
  width: 300px;
  height: 144px;
  color: ${color.white};
  font-size: 48px;
  line-height: 60px;
  text-align: center;

  @media only screen and (max-width: 850px) {
    width: 150px;
    height: auto;
    font-size: 24px;
    line-height: 29px;
    text-align: left;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 95px;
  @media only screen and (max-width: 850px) {
    margin-top: 44px;
  }
`;

export const Input = styled.input`
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

  @media only screen and (max-width: 850px) {
    width: 310px;
    margin: 0 auto;
  }
`;

export const Button = styled.button`
  appearance: none;
  background: none;
  border: none;
  outline: none;
  width: 367px;
  height: 48px;
  background-color: ${color.redRibbon};
  border-radius: 8px;
  margin-top: 89px;
  font-size: 18px;
  line-height: 25px;
  color: ${color.white};
  cursor: pointer;
  @media only screen and (max-width: 850px) {
    width: 310px;
    margin-top: 31px;
  }
`;

export const Text = styled.p`
  color: ${color.dustyGray};
  font-size: 14px;
  line-height: 80px;

  a {
    color: ${color.dustyGray};
  }

  @media only screen and (max-width: 850px) {
    width: 310px;
    text-align: center;
  }
`;

export default Register;
