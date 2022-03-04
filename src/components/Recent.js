import React, { useState } from "react";
import styled from "styled-components";
import CircularProgress from "@mui/material/CircularProgress";
import Card from "./Card";
import { useGetMovies } from "../hooks//useGetMovies";
import { color } from "../styles/color";
import RecentMobile from "./RecentMobile";

const Recent = () => {
  const [page, setPage] = useState(0);
  const [index, setIndex] = useState(4);

  // refactor
  const handleClick = () => {
    if (page === 0 && index === 4) {
      setPage(index);
      setIndex(index + 4);
    } else if (page === 4 && index === 8) {
      setPage(index);
      setIndex(index + 2);
    } else {
      setPage(0);
      setIndex(4);
    }
  };

  const handleClickDown = () => {
    if (page === 0 && index === 4) {
      setPage(8);
      setIndex(10);
    } else if (page === 4 && index === 8) {
      setPage(0);
      setIndex(4);
    } else {
      setPage(4);
      setIndex(8);
    }
  };

  const { movies, error, loading } = useGetMovies();
  const hasError = Boolean(error);
  return (
    <>
      <Show>
        <RecentBox>
          <TitlePosition>
            <Title>
              Recent added movies <span>({index}/10)</span>
            </Title>
            <Button onClick={handleClickDown}>&#x2329;</Button>
            <Button onClick={handleClick}>&#x232A;</Button>
          </TitlePosition>
          {loading ? (
            <CircularProgress
              sx={{ position: "absolute", top: "50%", right: "50%" }}
            />
          ) : hasError ? (
            <h1>There was a network error. Please try again.</h1>
          ) : (
            <CardPosition>
              {movies.length &&
                movies.slice(page, index).map((movie) => {
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
  color: #fff;
  margin-right: 797px;

  span {
    opacity: 0.5;
  }
`;

const Button = styled.button`
  appearance: none;
  background: none;
  border: none;
  outline: none;
  width: 32px;
  height: 32px;
  background-color: #f5044c;
  color: #fff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
`;

export default Recent;
