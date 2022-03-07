import React, { useMemo } from "react";
import styled from "styled-components";
import { CATEGORIES } from "../constants";
import { color } from "../styles/color";
import { useGetMovies } from "../hooks/useGetMovies";
import { useNavigate } from "react-router-dom";
import { ErrorPosition } from "../pages/Favorite";
import CircularProgress from "@mui/material/CircularProgress";
import { Error } from "../components/Header";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Main } from "../components/Main";
import { UserContextProvider } from "../context/UserContext";

function CategoriesWithProvider({ children }) {
  return (
    <UserContextProvider>
      <Categories>{children}</Categories>
    </UserContextProvider>
  );
}

const Categories = () => {
  const { movies, error, loading } = useGetMovies();
  const navigate = useNavigate();
  return (
    <Main>
      <CategoriesBox>
        <ArrowPosition onClick={() => navigate(-1)}>
          <ArrowBackIosNewIcon sx={{ color: "white" }}></ArrowBackIosNewIcon>
        </ArrowPosition>
        <Text>Categories</Text>
        {loading ? (
          <ErrorPosition>
            <CircularProgress />
          </ErrorPosition>
        ) : error ? (
          <ErrorPosition>
            <Error>There was a network error. Please try again.</Error>
          </ErrorPosition>
        ) : (
          <CardPosition>
            {CATEGORIES.map((type) => {
              return (
                <Card onClick={() => navigate(type)}>
                  <TextBox>{type}</TextBox>
                  <TextBox>
                    {movies.filter((movie) => movie.type.includes(type)).length}
                  </TextBox>
                </Card>
              );
            })}
          </CardPosition>
        )}
      </CategoriesBox>
    </Main>
  );
};

export const ArrowPosition = styled.div`
  visibility: hidden;
  position: absolute;
  top: 37px;
  left: 32px;
  @media only screen and (max-width: 850px) {
    visibility: visible;
  }
`;

const CategoriesBox = styled.div`
  min-height: 85vh;
  background-color: ${color.black};
  padding-left: 152px;
  padding-right: 152px;
  padding-top: 152px;
  @media only screen and (max-width: 850px) {
    padding: 0px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    padding-top: 37px;
    padding-bottom: 65px;
  }
`;

const CardPosition = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin: 0 auto;
  @media only screen and (max-width: 850px) {
    width: 100%;
    align-items: center;
    justify-content: center;
  }
`;

const Card = styled.div`
  width: 165px;
  height: 142px;
  background-color: ${color.mineShaft};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
`;

const Text = styled.h1`
  color: ${color.white};
  margin: 0px;
  font-size: 24px;
  line-height: 23px;
  letter-spacing: -0.103158px;
  margin-bottom: 50px;
`;

const TextBox = styled.h1`
  color: ${color.white};
  margin: 0px;
  font-size: 24px;
  line-height: 23px;
  letter-spacing: -0.103158px;
  padding-bottom: 10px;
`;

export default CategoriesWithProvider;
