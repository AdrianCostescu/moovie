import React, { useEffect } from "react";
import styled from "styled-components";
import Recent from "../components/Recent";
import Content from "../components/Content";
import { Main } from "../components/Main";
import Header from "../components/Header";
import { useCurrentUser, UserContextProvider } from "../context/UserContext";

function HomeWithProviders({ children }) {
  return (
    <UserContextProvider>
      <Home>{children}</Home>
    </UserContextProvider>
  );
}

function Home() {
  const { refetch } = useCurrentUser();

  // on mount
  useEffect(() => {
    refetch();
  }, []);

  return (
    <Main>
      <HomePage>
        <Header />
        <Recent />
        <Content />
      </HomePage>
    </Main>
  );
}

const HomePage = styled.div``;

export default HomeWithProviders;
