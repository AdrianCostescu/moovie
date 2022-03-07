import React, { useState } from "react";
import styled from "styled-components";
import CircularProgress from "@mui/material/CircularProgress";
import Card from "./Card";
import { useGetMovies } from "../hooks//useGetMovies";
import { color } from "../styles/color";
import RecentMobile from "./RecentMobile";
import { useGetPaginatedMovies } from "../hooks/useGetPaginatedMovies";
import { PrimaryButton } from "./core/Button";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const LIMIT = 4;
const INITIAL_PAGE = 1;

const Recent = () => {
  const [page, setPage] = useState(INITIAL_PAGE);

  const {
    movies,
    error: getPaginatedMoviesError,
    loading: isGetPaginatedMoviesLoading,
  } = useGetPaginatedMovies({
    page,
    limit: LIMIT,
  });
  const { movies: moviesTotal, error, loading } = useGetMovies();
  const hasError = Boolean(error || getPaginatedMoviesError);
  const isLoading = isGetPaginatedMoviesLoading || loading;

  const totalMoviesLength = moviesTotal.length;

  const totalPaginatedMovies =
    movies.length === LIMIT ? page * LIMIT : (page - 1) * LIMIT + movies.length;

  const handleNextClick = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousClick = () => {
    if (page) setPage((prevPage) => prevPage - 1);
  };

  return (
    <>
      <Show>
        <RecentBox>
          <TitlePosition>
            <Title>
              Recent added movies{" "}
              <span>
                ({totalPaginatedMovies}/{totalMoviesLength})
              </span>
            </Title>
            <ArrowPosition>
              <PrimaryButton
                buttonSize="small"
                disabled={page === INITIAL_PAGE}
                onClick={handlePreviousClick}
              >
                <ArrowBackIosNewIcon
                  sx={{ fontSize: "16px" }}
                ></ArrowBackIosNewIcon>
              </PrimaryButton>
              <PrimaryButton
                buttonSize="small"
                disabled={totalPaginatedMovies === totalMoviesLength}
                onClick={handleNextClick}
              >
                <ArrowBackIosNewIcon
                  sx={{ fontSize: "16px", transform: "rotate(180deg)" }}
                ></ArrowBackIosNewIcon>
              </PrimaryButton>
            </ArrowPosition>
          </TitlePosition>
          {isLoading ? (
            <CircularProgress
              sx={{ position: "absolute", top: "50%", right: "50%" }}
            />
          ) : hasError ? (
            <h1>There was a network error. Please try again.</h1>
          ) : (
            <CardPosition>
              {movies.length &&
                movies.map((movie) => {
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
        </RecentBox>
      </Show>
      <ShowMobile>
        <RecentMobile />
      </ShowMobile>
    </>
  );
};

const Show = styled.div`
  @media only screen and (max-width: 850px) {
    display: none;
  }
`;

const ShowMobile = styled.div`
  display: none;
  @media only screen and (max-width: 850px) {
    display: block;
  }
`;

const RecentBox = styled.div`
  background-color: ${color.ebony};
  height: 864px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CardPosition = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  align-items: center;
`;

const TitlePosition = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  width: 256px;
  height: 69px;
  font-size: 18px;
  line-height: 80px;
  color: ${color.white};
  margin-right: 797px;

  span {
    opacity: 0.5;
  }
`;

const ArrowPosition = styled.div`
  display: flex;
  gap: 8px;
`;

export default Recent;
