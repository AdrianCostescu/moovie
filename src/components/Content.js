import React, { useState, useMemo } from "react";
import styled from "styled-components";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Card from "./Card";
import { useGetMovies } from "../hooks/useGetMovies";
import { ErrorPosition } from "../pages/Favorite";
import { Error } from "./Header";
import CircularProgress from "@mui/material/CircularProgress";
import ContentMobile from "./ContentMobile";

const Content = () => {
  const [type, setType] = useState("Adventure");
  const { movies, error, loading } = useGetMovies();

  const HandleChange = (e) => {
    setType(e.target.value);
  };

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => movie.type.includes(type));
  }, [movies, type]);

  return (
    <>
      <Show>
        <ContentBox>
          <HeaderBox>
            <Title>See what movies are coming next month</Title>
            <FilterBox>
              <Text>Filter by</Text>
              <FormControl
                sx={{
                  width: 158,
                  height: 40,
                  backgroundColor: "#f5044c",
                  borderRadius: 2,
                  color: "#fff",
                  display: "flex",
                }}
              >
                <Select
                  sx={{
                    width: 158,
                    height: 40,
                    color: "#fff",
                    fontSize: 18,
                  }}
                  defaultValue={type}
                  value={type}
                  onChange={HandleChange}
                >
                  <MenuItem value="Adventure">Adventure</MenuItem>
                  <MenuItem value="Action">Action</MenuItem>
                  <MenuItem value="Drama">Drama</MenuItem>
                  <MenuItem value="Crime">Crime</MenuItem>
                  <MenuItem value="Comedy">Comedy</MenuItem>
                  <MenuItem value="Thriller">Thriller</MenuItem>
                  <MenuItem value="Fantasy">Fantasy</MenuItem>
                  <MenuItem value="Horror">Horror</MenuItem>
                  <MenuItem value="Mystery">Mystery</MenuItem>
                  <MenuItem value="Family">Family</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ marginLeft: "16px" }}>
                <Select
                  sx={{
                    backgroundColor: "#f5044c",
                    width: 158,
                    height: 40,
                    color: "#fff",
                    fontSize: 18,
                  }}
                >
                  <MenuItem value=""></MenuItem>
                </Select>
              </FormControl>
            </FilterBox>
          </HeaderBox>
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
              {filteredMovies.length &&
                filteredMovies.map((movie) => {
                  return (
                    <Card
                      key={movie.id}
                      id={movie.id}
                      title={movie.title}
                      type={movie.type}
                      score={movie.score}
                      img={movie.image[0]}
                      release={movie.release}
                    ></Card>
                  );
                })}
            </CardPosition>
          )}
        </ContentBox>
      </Show>
      <ShowMobile>
        <ContentMobile></ContentMobile>
      </ShowMobile>
    </>
  );
};

const Show = styled.div`
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

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #13131c;
  padding-top: 120px;
`;

const HeaderBox = styled.div`
  height: 128px;
  display: flex;
`;

const Title = styled.h1`
  height: 128px;
  width: 592px;
  font-size: 48px;
  color: #fff;
  margin-top: 0px;
`;

export const Text = styled.p`
  width: 71px;
  height: 60px;
  font-size: 18px;
  line-height: 60px;
  color: #ffffff;
  opacity: 0.7;
`;

export const FilterBox = styled.div`
  height: 60px;
  display: flex;
  margin-left: 101px;
  justify-content: center;
  align-items: center;
`;

const CardPosition = styled.div`
  width: 1136px;
  margin: 0 auto;
  margin-top: 100px;
  margin-bottom: 100px;
  display: flex;
  gap: 28px 16px;
  flex-wrap: wrap;
`;

export default Content;
