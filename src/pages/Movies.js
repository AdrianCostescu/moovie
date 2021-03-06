import React, { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import logo from "../img/imdb.png";
import play2 from "../img/play.png";
import PhotoSlide from "../components/PhotoSlide";
import { Main } from "../components/Main";
import { useGetMovieById } from "../hooks/useGetMovieById";
import CircularProgress from "@mui/material/CircularProgress";
import { color } from "../styles/color";
import back from "../img/back.png";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import Player from "../components/Player";
import { UserContextProvider } from "../context/UserContext";
import { useCurrentUser } from "../context/UserContext";
import { useAddMovieToFavorite } from "../hooks/useAddMovieToFavorite";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import BookmarkRemoveOutlinedIcon from "@mui/icons-material/BookmarkRemoveOutlined";

function MoviesWithProviders({ children }) {
  return (
    <UserContextProvider>
      <Movies>{children}</Movies>
    </UserContextProvider>
  );
}

const Movies = () => {
  const [isAddMovieModalOpen, setIsAddMovieModalOpen] = useState(false);
  const [view, setView] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const { user, refetch } = useCurrentUser();
  const { movie, loading } = useGetMovieById({ id });

  const hasMovie = Boolean(movie);

  // Get favorite movies from user
  const favoriteMoviesIds = useMemo(
    () => user?.favoriteMoviesIds || [],
    [user]
  );

  const isMovieAlreadyFavorite = Boolean(
    favoriteMoviesIds.find((movieId) => movieId == id)
  );

  const [addMovie] = useAddMovieToFavorite();

  async function addMovieToFavorite() {
    if (user) {
      const updatedMoviesFavorites = isMovieAlreadyFavorite
        ? favoriteMoviesIds.filter((movieId) => movieId != id)
        : [...favoriteMoviesIds, parseInt(id)];

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
          refetch();
        });
    }
  }
  return (
    <Main>
      {loading ? (
        <CircularProgress />
      ) : !hasMovie ? (
        <h1>Movie does not exist</h1>
      ) : (
        <MovieBox>
          <LeftSide>
            <Img img={movie.image[0]}>
              <PlayButton
                src={play2}
                onClick={() => setIsAddMovieModalOpen(true)}
              ></PlayButton>
              <IconClick onClick={addMovieToFavorite}>
                {isMovieAlreadyFavorite ? (
                  <BookmarkRemoveOutlinedIcon
                    sx={{ color: "white", fontSize: "24px", opacity: "0.6" }}
                  />
                ) : (
                  <BookmarkAddOutlinedIcon
                    sx={{ color: "white", fontSize: "24px" }}
                  />
                )}
              </IconClick>

              <IconBack src={back} onClick={() => navigate(-1)}></IconBack>
            </Img>
            <LinkImg>See original source</LinkImg>
          </LeftSide>
          <RightSide>
            <Title>
              {movie.title} <Logo src={logo} /> <Span>{movie.score}/10</Span>
            </Title>
            <Type>
              {movie.type.join(" ??? ")} ??? {movie.time}
            </Type>
            <Description>{movie.description}</Description>
            <ButtonWatch onClick={addMovieToFavorite}>
              {isMovieAlreadyFavorite ? "Remove from " : "Add to "} watchlist
            </ButtonWatch>
            <Position>
              <SubTitle>Director</SubTitle>
              <SubSpan>{movie.director}</SubSpan>
            </Position>

            <Position>
              <SubTitle>Writers</SubTitle>
              <SubSpan>{movie.writers?.join(", ")}</SubSpan>
            </Position>

            <Position>
              <SubTitle>Stars</SubTitle>
              {!view && (
                <SubSpan>
                  {movie.stars?.slice(0, 2).join(", ")}
                  <SpanCredits onClick={() => setView(true)}>
                    See full cast and crew
                  </SpanCredits>
                </SubSpan>
              )}
              {view && (
                <SubSpan>
                  {movie.stars.join(", ")}
                  <SpanCredits onClick={() => setView(false)}>Hide</SpanCredits>
                </SubSpan>
              )}
            </Position>
          </RightSide>
          <Modal
            open={isAddMovieModalOpen}
            onClose={() => setIsAddMovieModalOpen(false)}
          >
            <Player player={isAddMovieModalOpen} id={movie.id}></Player>
          </Modal>
        </MovieBox>
      )}
      <PhotoSlide />
    </Main>
  );
};

const IconClick = styled.div`
  visibility: hidden;
  @media only screen and (max-width: 850px) {
    visibility: visible;
    height: 20px;
    width: 17px;
    position: absolute;
    right: 5%;
    top: 5%;
  }
`;

const IconBack = styled.img`
  visibility: hidden;
  @media only screen and (max-width: 850px) {
    visibility: visible;
    height: 17px;
    width: 10px;
    position: absolute;
    left: 5%;
    top: 5%;
  }
`;

const MovieBox = styled.div`
  width: 100%;
  background-color: ${color.ebony};
  display: flex;
  justify-content: center;
  padding-bottom: 117px;
  padding-top: 117px;

  @media only screen and (max-width: 850px) {
    flex-direction: column;
    padding-top: 0px;
    padding-bottom: 0px;
  }
`;

const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media only screen and (max-width: 850px) {
    width: 100%;
    flex: none;
  }
`;

const Img = styled.div`
  height: 552px;
  width: 368px;
  background-image: linear-gradient(
      0deg,
      rgba(36, 36, 36, 0.3),
      rgba(36, 36, 36, 0.3)
    ),
    ${(props) => `url(${props.img})`};
  background-size: cover;
  border-radius: 20px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: 850px) {
    border-radius: 0px;
    height: 400px;
    width: 0px;
    width: 100%;
    background-size: cover;
  }
`;

const PlayButton = styled.img`
  height: 80px;
  width: 80px;
  position: absolute;
`;

const LinkImg = styled.p`
  width: 168px;
  height: 25px;
  font-size: 18px;
  line-height: 25px;
  text-decoration-line: underline;
  color: ${color.white};
  opacity: 0.6;

  @media only screen and (max-width: 850px) {
    display: none;
  }
`;

const RightSide = styled.div`
  display: flex;
  margin-left: 112px;
  flex-direction: column;

  @media only screen and (max-width: 850px) {
    margin: 0px;
    margin-top: -15px;
    width: 100%;
    border-radius: 20px 20px 0px 0px;
    background-color: ${color.ebony};
  }
`;

const Title = styled.div`
  font-size: 48px;
  line-height: 60px;
  color: ${color.white};
  height: 53px;
  display: flex;
  align-items: center;

  @media only screen and (max-width: 850px) {
    font-size: 34px;
    line-height: 41px;
    margin-left: 16px;
    margin-top: 24px;
  }
`;

const Logo = styled.img`
  height: 22px;
  margin-left: 20px;
`;

const Span = styled.span`
  font-size: 12px;
  line-height: 19px;
  margin-left: 5px;
`;

const Type = styled.p`
  height: 25px;
  font-size: 18px;
  line-height: 25px;
  color: ${color.white};
  opacity: 0.6;

  @media only screen and (max-width: 850px) {
    margin-left: 16px;
    width: 360px;
  }
`;

const Description = styled.p`
  width: 464px;
  color: ${color.white};
  font-size: 18px;
  line-height: 25px;
  @media only screen and (max-width: 850px) {
    font-size: 13px;
    line-height: 24px;
    width: 95%;
    margin-left: 16px;
    display: flex;
    align-items: center;
  }
`;

const ButtonWatch = styled.button`
  appearance: none;
  background: none;
  border: none;
  outline: none;
  width: 176px;
  height: 48px;
  background-color: ${color.redRibbon};
  border-radius: 5px;
  font-size: 18px;
  line-height: 25px;
  color: ${color.white};
  margin-top: 48px;
  margin-bottom: 52px;

  @media only screen and (max-width: 850px) {
    display: none;
  }
`;

const Position = styled.div`
  display: flex;
`;

const SubTitle = styled.p`
  width: 80px;
  height: 25px;
  font-size: 18px;
  line-height: 25px;
  color: ${color.white};
  opacity: 0.6;

  @media only screen and (max-width: 850px) {
    font-size: 13px;
    line-height: 16px;
    margin-left: 16px;
  }
`;

const SubSpan = styled.p`
  width: 368px;
  font-size: 18px;
  line-height: 25px;
  color: ${color.white};
  margin-left: 16px;
  display: flex;
  flex-wrap: wrap;

  @media only screen and (max-width: 850px) {
    font-size: 13px;
    line-height: 16px;
    margin-left: 16px;
    width: 200px;
  }
`;

const SpanCredits = styled.span`
  color: ${color.redRibbon};
  font-size: 18px;
  line-height: 25px;
  cursor: pointer;

  @media only screen and (max-width: 850px) {
    font-size: 13px;
    line-height: 16px;
  }
`;

export default MoviesWithProviders;
