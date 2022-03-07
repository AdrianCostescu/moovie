import React from "react";
import styled from "styled-components";
import { Main } from "../components/Main";
import { color } from "../styles/color";

const ErrorPage = () => {
  return (
    <Main>
      <ErrorPageBox>
        <SubText>Oops!</SubText>
        <Text>404 - PAGE NOT FOUND</Text>
      </ErrorPageBox>
    </Main>
  );
};

const ErrorPageBox = styled.div`
  min-height: 80vh;
  background-color: ${color.ebony};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

const Text = styled.h1`
  margin: 0;
  font-size: 48px;
  line-height: 60px;
  color: ${color.white};
`;

const SubText = styled.h1`
  margin: 0;
  font-size: 58px;
  line-height: 60px;
  color: ${color.redRibbon};
`;

export default ErrorPage;
