import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { PrimaryButton } from "../components/core/Button";
import { useAddMovieToFavorite } from "../hooks/useAddMovieToFavorite";
import { useCurrentUser } from "../context/UserContext";

const Card = ({ title, type, score, img, release, id }) => {
  const { user, refetch } = useCurrentUser();

  // Get favorite movies from user
  const favoriteMoviesIds = useMemo(
    () => user?.favoriteMoviesIds || [],
    [user]
  );

  const isMovieAlreadyFavorite = Boolean(
    favoriteMoviesIds.find((movieId) => movieId === id)
  );

  const [addMovie] = useAddMovieToFavorite();

  async function addMovieToFavorite() {
    if (user) {
      const updatedMoviesFavorites = isMovieAlreadyFavorite
        ? favoriteMoviesIds.filter((movieId) => movieId !== id)
        : [...favoriteMoviesIds, id];

      await addMovie({
        variables: {
          id: user.id,
          input: {
            favoriteMoviesIds: updatedMoviesFavorites,
          },
        },
      })
        .catch((error) => error)
        .then((response) => {
          const favoriteMoviesIds = response?.data?.addMovie?.favoriteMoviesIds;
          refetch();
        });
    }
  }
  return (
    <CardBox>
      <Link to={"/movies/" + id}>
        <ImgBox img={img}></ImgBox>
      </Link>
      <ButtonPosition>
        <PrimaryButton fontSize="small" onClick={addMovieToFavorite}>
          {isMovieAlreadyFavorite ? "Remove from " : "Add to "} watchlist
        </PrimaryButton>
        <Nota>{score}</Nota>
      </ButtonPosition>
      <Link to={"/movies/" + id}>
        <Title>{title}</Title>
        <SubTitle>
          Realeased date: {release} {type?.join(" • ")}
        </SubTitle>
      </Link>
    </CardBox>
  );
};

const CardBox = styled.div`
  height: auto;
`;

const ImgBox = styled.div`
  background-image: ${(props) => `url(${props.img})`};
  background-size: cover;
  width: 272px;
  height: 416px;
  border-radius: 20px;
  display: flex;
  align-items: flex-end;
  justify-content: end;
`;

const Nota = styled.div`
  width: 24px;
  height: 24px;
  background-color: #ff9a03;
  boreder-radius: 5px;
  font-size: 10px;
  line-height: 80px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonPosition = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  margin-left: 75px;
  margin-top: -56px;
`;

const Title = styled.h1`
  width: 272px;
  height: 48px;
  font-size: 18px;
  line-height: 80px;
  color: #fff;
  display: flex;
  align-items: center;
  margin-top: 24px;
`;

const SubTitle = styled.p`
  width: 202px;
  font-size: 14px;
  line-height: 19px;
  opacity: 0.5;
  color: #fff;
  margin-top: -15px;
  text-decoration: none;
`;

export default Card;
