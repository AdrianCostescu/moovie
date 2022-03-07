import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { useGetMovies } from "../hooks/useGetMovies";
import Card from "./Card";
import { color } from "../styles/color";
import { ErrorPosition } from "../pages/Favorite";
import CircularProgress from "@mui/material/CircularProgress";
import { Error } from "../components/Header";

const CategoriesType = () => {
  const { movies, error, loading } = useGetMovies();
  const location = useLocation();

  const url = location.pathname;
  const lastSegment = url.split("/").pop();

  const filterMovieByType = useMemo(() => {
    return movies.filter((movie) => movie.type.includes(lastSegment));
  }, [movies]);

  return (
    <CategoriesTypeBox>
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
  );
};

const CategoriesTypeBox = styled.div`
  min-height: 100vh;
  background-color: ${color.black};
  padding-left: 152px;
  padding-right: 152px;
  padding-top: 152px;
`;

const Text = styled.h1`
  color: ${color.white};
  margin: 0;
  margin-bottom: 50px;
`;

const CardPosition = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

export default CategoriesType;
