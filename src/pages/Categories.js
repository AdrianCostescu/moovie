import React, { useMemo } from "react";
import styled from "styled-components";
import { CATEGORIES } from "../constants";
import { color } from "../styles/color";
import { useGetMovies } from "../hooks/useGetMovies";
import { useNavigate } from "react-router-dom";
import { ErrorPosition } from "../pages/Favorite";
import CircularProgress from "@mui/material/CircularProgress";
import { Error } from "../components/Header";

const Categories = () => {
  const { movies, error, loading } = useGetMovies();
  const navigate = useNavigate();

  return (
    <CategoriesBox>
      <Text>Categories</Text>
      {loading ? (
        <ErrorPosition>
          <CircularProgress />
        </ErrorPosition>
      ) : error ? (
        <ErrorPosition>
          <Error>There was a network error. Please try again.</Error>
        </ErrorPosition>
      ) : (
        <CardPosition>
          {CATEGORIES.map((type) => {
            return (
              <Card onClick={() => navigate(type)}>
                <TextBox>{type}</TextBox>
                <TextBox>
                  {movies.filter((movie) => movie.type.includes(type)).length}
                </TextBox>
              </Card>
            );
          })}
        </CardPosition>
      )}
    </CategoriesBox>
  );
};

const CategoriesBox = styled.div`
  min-height: 85vh;
  background-color: ${color.black};
  padding-left: 152px;
  padding-right: 152px;
  padding-top: 152px;
`;

const CardPosition = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin: 0 auto;
`;

const Card = styled.div`
  width: 165px;
  height: 142px;
  background-color: ${color.mineShaft};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
`;

const Text = styled.h1`
  color: ${color.white};
  margin: 0px;
  font-size: 24px;
  line-height: 23px;
  letter-spacing: -0.103158px;
  margin-bottom: 50px;
`;

const TextBox = styled.h1`
  color: ${color.white};
  margin: 0px;
  font-size: 24px;
  line-height: 23px;
  letter-spacing: -0.103158px;
  padding-bottom: 10px;
`;

export default Categories;
