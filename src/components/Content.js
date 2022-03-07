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
import Calendar from "./Calendar";
import Modal from "../components/Modal";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import { CATEGORIES } from "../constants";

const Content = () => {
  const [isAddMovieModalOpen, setIsAddMovieModalOpen] = useState(false);
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
              <FormControl>
                <Select
                  sx={{
                    width: "158px",
                    height: "40px",
                    backgroundColor: "#F5044C",
                    borderRadius: "8px",
                    marginLeft: "24px",
                    marginRight: "16px",
                    color: "white",
                    fontSize: "18px",
                    lineHeight: "60px",
                    fontWeight: "bold",
                  }}
                  defaultValue={type}
                  value={type}
                  onChange={HandleChange}
                >
                  {CATEGORIES.map((type) => {
                    return <MenuItem value={type}>{type}</MenuItem>;
                  })}
                </Select>
              </FormControl>
              <CalendarButton onClick={() => setIsAddMovieModalOpen(true)}>
                <EventOutlinedIcon
                  sx={{ fontSize: "16px", marginLeft: "16px" }}
                />
                <span>Any date</span>
                <ArrowForwardIosIcon
                  sx={{
                    fontSize: "16px",
                    transform: "rotate(90deg)",
                    marginRight: "16px",
                  }}
                />
                <Modal
                  open={isAddMovieModalOpen}
                  onClose={() => setIsAddMovieModalOpen(false)}
                >
                  <Calendar player={isAddMovieModalOpen}></Calendar>
                </Modal>
              </CalendarButton>
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

const CalendarButton = styled.button`
  border: none;
  height: 40px;
  width: 174px;
  background-color: transparent;
  border: 1px solid #f5044c;
  box-sizing: border-box;
  border-radius: 8px;
  color: #f5044c;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default Content;
