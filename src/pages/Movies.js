import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import logo from "../img/imdb.png";
import play2 from "../img/play.png";
import PhotoSlide from "../components/PhotoSlide";
import { Main } from "../components/Main";
import { useGetMovieById } from "../hooks/useGetMovieById";
import CircularProgress from "@mui/material/CircularProgress";

const MovieBox = styled.div`
  width: 100%;
  background-color: #010103;
  display: flex;
  justify-content: center;
  padding-bottom: 117px;
  padding-top: 117px;
`;

const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
`;

const PlayButton = styled.img`
  height: 80px;
  width: 80px;
  position: absolute;
`;

const PlayButton1 = styled.img`
  height: 40px;
  width: 40px;
  position: absolute;
`;

const LinkImg = styled.p`
  width: 168px;
  height: 25px;
  font-size: 18px;
  line-height: 25px;
  text-decoration-line: underline;
  color: #ffffff;
  opacity: 0.6;
`;

const RightSide = styled.div`
  display: flex;
  margin-left: 112px;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 48px;
  line-height: 60px;
  color: #fff;
  height: 53px;
  display: flex;
  align-items: center;
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
  color: #fff;
  opacity: 0.6;
`;

const Description = styled.p`
  width: 464px;
  color: #fff;
  font-size: 18px;
  line-height: 25px;
`;

const ButtonWatch = styled.button`
  appearance: none;
  background: none;
  border: none;
  outline: none;
  width: 176px;
  height: 48px;
  background-color: #f5044c;
  border-radius: 5px;
  font-size: 18px;
  line-height: 25px;
  color: #fff;
  margin-top: 48px;
  margin-bottom: 52px;
`;

const Position = styled.div`
  display: flex;
`;

const SubTitle = styled.p`
  width: 80px;
  height: 25px;
  font-size: 18px;
  line-height: 25px;
  color: #fff;
  opacity: 0.6;
`;

const SubSpan = styled.p`
  width: 368px;
  font-size: 18px;
  line-height: 25px;
  color: #fff;
  margin-left: 16px;
  display: flex;
  flex-wrap: wrap;
`;

const SpanCredits = styled.span`
  color: #f5044c;
  font-size: 18px;
  line-height: 25px;
  cursor: pointer;
`;

const Movies = () => {
  const { id } = useParams();
  const [view, setView] = useState(false);

  // TODO: add error/loading handling
  const { movie, error, loading } = useGetMovieById({ id });
  console.log(movie);

  const hasMovie = Boolean(movie);

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
              <PlayButton src={play2}></PlayButton>
            </Img>
            <LinkImg>See original source</LinkImg>
          </LeftSide>
          <RightSide>
            <Title>
              {movie.title} <Logo src={logo} /> <Span>{movie.score}/10</Span>
            </Title>
            <Type>
              {movie.type.join(" • ")} • {movie.time}
            </Type>
            <Description>{movie.description}</Description>
            <ButtonWatch>Add to watchlist</ButtonWatch>
            <Position>
              <SubTitle>Director</SubTitle>
              <SubSpan>{movie.director}</SubSpan>
            </Position>

            <Position>
              <SubTitle>Writers</SubTitle>
              <SubSpan>{movie.writers.join(", ")}</SubSpan>
            </Position>

            <Position>
              <SubTitle>Stars</SubTitle>
              {!view && (
                <SubSpan>
                  {movie.stars.slice(0, 2).join(", ")}
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
        </MovieBox>
      )}
      <PhotoSlide />
    </Main>
  );
};

export default Movies;
