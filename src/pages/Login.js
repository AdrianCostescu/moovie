import React, { useState } from "react";
import { RegisterPage, Logo, ContentBox, Title, Input, Text } from "./Register";
import logo from "../img/moovie-watchers_logo.png";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useGetUserCredentialsLazyQuery } from "../hooks/useGetUserCredentialsLazyQuery";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { color } from "../styles/color";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [login, response, error] = useGetUserCredentialsLazyQuery();
  const navigate = useNavigate();

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

  async function handleLogin() {
    const response = await login({
      variables: {
        email,
        password,
      },
    })
      .catch((error) => setOpen(true))
      .then((response) => {
        const user = response.data?.user?.[0];

        if (user?.id) {
          // refetch user context data

          if (user.isAdmin) {
            navigate("/admin");
          } else {
            navigate("/");
          }

          window.localStorage.setItem(
            "user",
            JSON.stringify({
              id: user.id,
            })
          );
        } else {
          setOpen(true);
        }
      });
  }

  return (
    <RegisterPage>
      <Logo src={logo} alt="logo"></Logo>
      <ContentBox>
        <Title>Log in to your account</Title>
        <Form>
          <Input
            type="email"
            placeholder="Email adress"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Input>
          <Input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
          <Reset>
            <Link to="/reset">Forgot password?</Link>
          </Reset>
        </Form>
        <ButtonSubmit onClick={handleLogin}>Log in</ButtonSubmit>

        {/* TODO: Add loading indicator */}
        {response.loading ? <div>Loading .....</div> : null}
        <Text>
          Don’t have an account? <Link to="/register">Let’s create one</Link>
        </Text>
      </ContentBox>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Incorrect credentials!
        </Alert>
      </Snackbar>
    </RegisterPage>
  );
};

const Reset = styled.p`
  width: 368px;
  height: 30px;
  color: ${color.dustyGray};
  font-size: 14px;
  line-height: 80px;
  display: flex;
  justify-content: end;
  align-items: flex-end;

  a {
    color: ${color.dustyGray};
    text-decoration: none;
  }
  @media only screen and (max-width: 850px) {
    width: 310px;
    margin-top: 8px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 48px;
  @media only screen and (max-width: 850px) {
  }
`;

const ButtonSubmit = styled.button`
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

export default Login;
