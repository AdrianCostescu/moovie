import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useGetMovies } from "../hooks/useGetMovies";
import Card from "./Card";
import { color } from "../styles/color";
import { ErrorPosition } from "../pages/Favorite";
import CircularProgress from "@mui/material/CircularProgress";
import { Error } from "../components/Header";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { ArrowPosition } from "../pages/Categories";
import { Main } from "./Main";
import { UserContextProvider } from "../context/UserContext";

function CategoriesTypeWithProviders({ children }) {
  return (
    <UserContextProvider>
      <CategoriesType>{children}</CategoriesType>
    </UserContextProvider>
  );
}

const CategoriesType = () => {
  const { movies, error, loading } = useGetMovies();
  const location = useLocation();
  const navigate = useNavigate();

  const url = location.pathname;
  const lastSegment = url.split("/").pop();

  const filterMovieByType = useMemo(() => {
    return movies.filter((movie) => movie.type.includes(lastSegment));
  }, [movies]);

  return (
    <Main>
      <CategoriesTypeBox>
        <ArrowPosition onClick={() => navigate(-1)}>
          <ArrowBackIosNewIcon sx={{ color: "white" }}></ArrowBackIosNewIcon>
        </ArrowPosition>
        <Text>{lastSegment}</Text>
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
            {filterMovieByType.map((movie) => {
              return (
                <Card
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  type={movie.type}
                  score={movie.score}
                  img={movie.image[0]}
                  release={movie.release}
                ></Card>
              );
            })}
          </CardPosition>
        )}
      </CategoriesTypeBox>
    </Main>
  );
};

const CategoriesTypeBox = styled.div`
  min-height: 100vh;
  background-color: ${color.black};
  padding-left: 152px;
  padding-right: 152px;
  padding-top: 152px;
  @media only screen and (max-width: 850px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    padding: 0px;
    padding-bottom: 65px;
  }
`;

const Text = styled.h1`
  color: ${color.white};
  margin: 0;
  margin-bottom: 50px;
  font-size: 24px;
  line-height: 23px;
  letter-spacing: -0.103158px;
  @media only screen and (max-width: 850px) {
    padding: 0px;
    padding-top: 37px;
  }
`;

const CardPosition = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  @media only screen and (max-width: 850px) {
    align-items: center;
    justify-content: center;
  }
`;

export default CategoriesTypeWithProviders;
