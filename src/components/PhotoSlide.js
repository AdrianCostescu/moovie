import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useGetPhotoById } from "../hooks/useGetPhotoById";
import { ErrorPosition } from "../pages/Favorite";
import { Error } from "./Header";
import CircularProgress from "@mui/material/CircularProgress";

const SlideBox = styled.div`
  height: 444px;
  background-color: #13131c;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.h1`
  color: #fff;
  font-size: 48px;
  line-height: 60px;
  margin-left: 152px;
`;

const ImgPosition = styled.div`
  display: flex;
  gap: 16px;
  margin-left: 152px;
`;

const Img = styled.img`
  width: 110px;
  height: 99px;
`;

const PhotoSlide = () => {
  const { id } = useParams();
  const { photo, error, loading } = useGetPhotoById({ id });

  const photoById = useMemo(() => {
    return photo ? photo.image : [];
  }, [photo]);

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

export default PhotoSlide;
