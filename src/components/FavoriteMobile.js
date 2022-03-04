import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { color } from "../styles/color";
import { Error } from "../components/Header";
import CircularProgress from "@mui/material/CircularProgress";
import CardMobile from "./CardMobile";
import back from "../img/back.png";

const FavMobileBox = styled.div`
  background-color: ${color.black};
  min-height: 100vh;
`;

const Icon = styled.img`
  height: 17px;
  width: 10px;
  position: absolute;
  top: 36px;
  left: 23px;
`;

const Title = styled.h1`
  display: flex;
  justify-content: center;
  width: 100%;
  padding-top: 36px;
  padding-bottom: 58px;
  font-size: 17px;
  line-height: 22px;
  letter-spacing: -0.41px;
  color: ${color.white};
  margin: 0 auto;
`;

const CardPosition = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
`;

const FavoriteMobile = ({ user, movies, loading, error }) => {
  const navigate = useNavigate();
  const favoriteMoviesIds = useMemo(() => {
    return user ? user.favoriteMoviesIds : [];
  }, [user]);

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => favoriteMoviesIds.includes(movie.id));
  }, [favoriteMoviesIds, movies]);

  return (
    <FavMobileBox>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Error>There was a network error. Please try again.</Error>
      ) : (
        <>
          <Icon src={back} onClick={() => navigate(-1)}></Icon>
          <Title>Watchlist</Title>
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
    </FavMobileBox>
  );
};

export default FavoriteMobile;
