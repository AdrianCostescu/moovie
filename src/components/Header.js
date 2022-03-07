import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { color } from "../styles/color";
import { useGetMovies } from "../hooks/useGetMovies";
import CircularProgress from "@mui/material/CircularProgress";
import HeaderMobile from "./HeaderMobile";
import Modal from "../components/Modal";
import Player from "../components/Player";
import { useAddMovieToFavorite } from "../hooks/useAddMovieToFavorite";
import { useCurrentUser } from "../context/UserContext";
import { PrimaryButton, SecondaryButton } from "./core/Button";

const Header = () => {
  const [isAddMovieModalOpen, setIsAddMovieModalOpen] = useState(false);
  const { movies, error, loading, refetch } = useGetMovies();

  const random = useMemo(
    () => 1 + Math.floor(Math.random() * movies.length - 1),
    []
  );

  const selectedMovie = movies[random];

  const { user } = useCurrentUser();

  const [addMovie] = useAddMovieToFavorite();

  const favoriteMoviesIds = useMemo(
    () => user?.favoriteMoviesIds || [],
    [user]
  );
  const isMovieAlreadyFavorite = Boolean(
    favoriteMoviesIds.find((movieId) => movieId === selectedMovie.id)
  );

  async function addMovieToFav() {
    if (user) {
      const updatedMoviesFavorites = isMovieAlreadyFavorite
        ? favoriteMoviesIds.filter((movieId) => movieId !== selectedMovie.id)
        : [...favoriteMoviesIds, selectedMovie.id];

      await addMovie({
        variables: {
          id: user.id,
          input: {
            favoriteMoviesIds: updatedMoviesFavorites,
          },
        },
      }).then(() => refetch());
    }
  }

  return (
    <>
      <Show>
        <HeaderBox>
          {loading ? (
            <CircularProgress />
          ) : error ? (
            <Error>There was a network error. Please try again.</Error>
          ) : (
            <>
              <LeftSide>
                <Title>{movies[random].title}</Title>
                <SubTitle>{movies[random].description}</SubTitle>
                <ButtonPosition>
                  <PrimaryButton
                    color={color.redRibbon}
                    onClick={() => setIsAddMovieModalOpen(true)}
                  >
                    Watch trailer
                  </PrimaryButton>

                  <Modal
                    open={isAddMovieModalOpen}
                    onClose={() => setIsAddMovieModalOpen(false)}
                  >
                    <Player
                      player={isAddMovieModalOpen}
                      id={movies[random].id}
                    ></Player>
                  </Modal>

                  <SecondaryButton onClick={addMovieToFav}>
                    {!isMovieAlreadyFavorite ? <Span>+</Span> : null}
                    {isMovieAlreadyFavorite ? "Remove" : "Add to list"}
                  </SecondaryButton>
                </ButtonPosition>
              </LeftSide>
              <Image img={movies[random].image[0]}></Image>
            </>
          )}
        </HeaderBox>
      </Show>
      <ShowMobile>
        <HeaderMobile
          loading={loading}
          error={error}
          movies={movies}
          random={random}
        />
      </ShowMobile>
    </>
  );
};

const Show = styled.div`
  position: relative;

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

const HeaderBox = styled.div`
  background-color: ${color.ebony};
  height: 700px;
  width: 100%;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 88px;
`;

const Title = styled.h1`
  font-size: 48px;
  line-height: 60px;
  color: ${color.white};
`;

const SubTitle = styled.p`
  width: 464px;
  color: ${color.white};
  font-size: 18px;
  line-height: 25px;
  opacity: 0.6;
`;

const ButtonPosition = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 55px;
`;

const Button = styled.button`
  appearance: none;
  background: none;
  border: none;
  outline: none;
  width: 176px;
  height: 48px;
  background-color: ${(props) => props.color};
  border-radius: 8px;
  font-size: 18px;
  line-height: 25px;
  color: ${color.white};
  font-weight: bold;
`;

const Span = styled.span`
  margin-right: 16px;
`;

const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
`;

const Image = styled.img`
  background-image: ${(props) => `url(${props.img})`};
  background-size: cover;
  background-position: center;
  width: 392px;
  height: 552px;
  border-radius: 20px;
`;

export const Error = styled.h1`
  color: ${color.white};
`;

export default Header;
