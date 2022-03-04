import React from "react";
import styled from "styled-components";
import { color } from "../styles/color";
import { useGetMovies } from "../hooks/useGetMovies";
import { CircularProgress } from "@mui/material";
import { Error } from "./Header";
import CardMobile from "./CardMobile";

const RecentMobileBox = styled.div`
  background-color: ${color.black};
`;

const Title = styled.h1`
  font-size: 34px;
  line-height: 41px;
  letter-spacing: 0.41px;
  color: ${color.white};
  margin: 0px auto;
  padding-top: 66px;
  margin-bottom: 14px;
  margin-left: 16px;
  margin-right: 16px;
`;

const CardPosition = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-y: scroll;
  gap: 8px;
  margin-left: 16px;
  padding-bottom: 52px;

  ::-webkit-scrollbar {
    display: none;
  }
`;

function RecentMobile() {
  const { movies, error, loading } = useGetMovies();
  return (
    <RecentMobileBox>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Error>There was a network error. Please try again.</Error>
      ) : (
        <>
          <Title>Recent added</Title>
          <CardPosition>
            {movies.slice(0, 10).map((movie) => {
              return (
                <CardMobile
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  release={movie.release}
                  img={movie.image[0]}
                ></CardMobile>
              );
            })}
          </CardPosition>
        </>
      )}
    </RecentMobileBox>
  );
}

export default RecentMobile;
