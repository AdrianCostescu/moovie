import React from "react";
import styled from "styled-components";
import Recent from "../components/Recent";
import Content from "../components/Content";
import { Main } from "../components/Main";
import Header from "../components/Header";

const HomePage = styled.div`
  
`;

function Home() {
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

export default Home;
