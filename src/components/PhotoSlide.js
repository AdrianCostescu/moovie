import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useGetPhotoById } from "../hooks/useGetPhotoById";
import { ErrorPosition } from "../pages/Favorite";
import { Error } from "./Header";
import CircularProgress from "@mui/material/CircularProgress";
import { color } from "../styles/color";

const PhotoSlide = () => {
  const { id } = useParams();
  const { photo, error, loading } = useGetPhotoById({ id });

  const photoById = useMemo(() => {
    return photo ? photo.image : [];
  }, [photo]);

  console.log(photo);

  return (
    <SlideBox>
      <Title>Photo</Title>
      {loading ? (
        <ErrorPosition>
          <CircularProgress />
        </ErrorPosition>
      ) : error ? (
        <ErrorPosition>
          <Error>There was a network error. Please try again.</Error>
        </ErrorPosition>
      ) : (
        <ImgPosition>
          {photoById.map((image) => {
            return <Img key={image} src={image}></Img>;
          })}
        </ImgPosition>
      )}
    </SlideBox>
  );
};

const SlideBox = styled.div`
  height: 444px;
  background-color: #13131c;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media only screen and (max-width: 850px) {
    height: auto;
    background-color: ${color.ebony};
  }
`;

const Title = styled.h1`
  color: #fff;
  font-size: 48px;
  line-height: 60px;
  margin-left: 152px;

  @media only screen and (max-width: 850px) {
    display: none;
  }
`;

const ImgPosition = styled.div`
  display: flex;
  gap: 16px;
  margin-left: 152px;

  @media only screen and (max-width: 850px) {
    flex-wrap: wrap;
    margin-left: 0px;
    justify-content: center;
    margin-top: 38px;
    margin-bottom: 38px;
  }
`;

const Img = styled.img`
  width: 110px;
  height: 99px;

  @media only screen and (max-width: 850px) {
    width: 101px;
    height: 64px;
  }
`;

export default PhotoSlide;
