import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { color } from "../styles/color";
import { useGetMovies } from "../hooks/useGetMovies";
import CardMobile from "./CardMobile";
import { CircularProgress } from "@mui/material";
import { Error } from "./Header";

const ContentMobile = () => {
  const [type, setType] = useState("Adventure");
  const { movies, error, loading } = useGetMovies();
  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => movie.type.includes(type));
  }, [movies, type]);
  return (
    <ContentMobileBox>
      <Title>Coming next</Title>
      <CardPosition>
        <Button onClick={() => setType("Adventure")}>Adventure</Button>
        <Button onClick={() => setType("Action")}>Action</Button>
        <Button onClick={() => setType("Drama")}>Drama</Button>
        <Button onClick={() => setType("Crime")}>Crime</Button>
        <Button onClick={() => setType("Comedy")}>Comedy</Button>
        <Button onClick={() => setType("Thriller")}>Thriller</Button>
        <Button onClick={() => setType("Fantasy")}>Fantasy</Button>
        <Button onClick={() => setType("Horror")}>Horror</Button>
        <Button onClick={() => setType("Mystery")}>Mystery</Button>
        <Button onClick={() => setType("Family")}>Family</Button>
      </CardPosition>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Error>There was a network error. Please try again.</Error>
      ) : (
        <>
          <CardPosition>
            {filteredMovies.map((movie) => {
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
    </ContentMobileBox>
  );
};

const ContentMobileBox = styled.div`
  background-color: ${color.black};
  padding-bottom: 52px;
`;

const Title = styled.h1`
  font-size: 34px;
  line-height: 41px;
  letter-spacing: 0.41px;
  color: ${color.white};
  margin: 0px auto;
  margin-left: 16px;
`;

const CardPosition = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-y: scroll;
  gap: 8px;
  margin-left: 16px;
  margin-top: 16px;
  margin-bottom: 16px;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Button = styled.button`
  width: 97px;
  height: 31px;
  background-color: transparent;
  color: ${color.white};
  border: 0.636364px solid #f5044c;
  box-sizing: border-box;
  border-radius: 30.8965px;
  font-size: 11.4545px;
  line-height: 14px;
  padding: 8px 26px 8px 26px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default ContentMobile;
