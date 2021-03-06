import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { Main } from "../components/Main";
import { useGetUserById } from "../hooks/useGetUserById";
import { useGetMovies } from "../hooks/useGetMovies";
import Card from "../components/Card";
import { color } from "../styles/color";
import { AiOutlineSearch } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { FilterBox, Text } from "../components/Content";
import { Error } from "../components/Header";
import CircularProgress from "@mui/material/CircularProgress";
import FavoriteMobile from "../components/FavoriteMobile";
import { useCurrentUser, UserContextProvider } from "../context/UserContext";
import { CATEGORIES } from "../constants";

function FavoriteWithProviders({ children }) {
  return (
    <UserContextProvider>
      <Favorite>{children}</Favorite>
    </UserContextProvider>
  );
}

const Favorite = () => {
  const [type, setType] = useState("Latest Added");
  const [searchTerm, setSearchTerm] = useState("");
  const { user, error, loading } = useCurrentUser();

  const {
    movies,
    error: getMoviesError,
    loading: isGetMoviesLoading,
  } = useGetMovies();

  const hasMovies = Boolean(movies.length);

  const favoriteMoviesIds = useMemo(() => {
    return user ? user.favoriteMoviesIds : [];
  }, [user]);

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => favoriteMoviesIds.includes(movie.id));
  }, [favoriteMoviesIds, movies]);

  const filteredMoviesByType = useMemo(() => {
    const filteredMoviesBySearchTerm = filteredMovies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (type === "Latest Added") {
      return filteredMoviesBySearchTerm;
    } else {
      return filteredMoviesBySearchTerm.filter((movie) =>
        movie.type.includes(type)
      );
    }
  });

  const HandleChange = (e) => {
    setType(e.target.value);
  };

  const isFavoriteMoviesListEmpty = filteredMoviesByType.length === 0;

  return (
    <>
      <Show>
        <Main>
          <FavoriteBox>
            <Title>Welcome to your Watchlist page.</Title>
            <Filter>
              <SearchBox>
                <SearchBar
                  placeholder="Search for a movie..."
                  type="text"
                  onChange={(event) => {
                    setSearchTerm(event.target.value);
                  }}
                />
                <AiOutlineSearch
                  style={{ fontSize: "25px", paddingRight: "24px" }}
                ></AiOutlineSearch>
              </SearchBox>
              <FilterBox>
                <Text>Sort by</Text>
                <FormControl
                  sx={{
                    width: 186,
                    height: 56,
                    borderRadius: 2,
                    border: "1px solid #F5044C",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Select
                    sx={{
                      width: 158,
                      height: 40,
                      color: "#F5044C",
                      fontSize: 18,
                    }}
                    defaultValue={type}
                    value={type}
                    onChange={HandleChange}
                  >
                    <MenuItem value="Latest Added">Latest Added</MenuItem>
                    {CATEGORIES.map((type) => {
                      return <MenuItem value={type}>{type}</MenuItem>;
                    })}
                  </Select>
                  <IoIosArrowDown
                    style={{
                      fontSize: "25px",
                      paddingRight: "15px",
                      color: "#F5044C",
                    }}
                  ></IoIosArrowDown>
                </FormControl>
              </FilterBox>
            </Filter>
            {isGetMoviesLoading ? (
              <ErrorPosition>
                <CircularProgress />
              </ErrorPosition>
            ) : getMoviesError ? (
              <ErrorPosition>
                <Error>There was a network error. Please try again.</Error>=
              </ErrorPosition>
            ) : !hasMovies ? (
              <ErrorPosition>
                <Error>There are no movies.</Error>
              </ErrorPosition>
            ) : isFavoriteMoviesListEmpty ? (
              <ErrorPosition>
                <Error>There are no movies.</Error>
              </ErrorPosition>
            ) : (
              <CardPosition>
                {filteredMoviesByType.map((movie) => {
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
          </FavoriteBox>
        </Main>
      </Show>
      <ShowMobile>
        <FavoriteMobile
          user={user}
          movies={movies}
          error={error}
          loading={loading}
        ></FavoriteMobile>
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

const FavoriteBox = styled.div`
  background-color: ${color.ebony};
  color: ${color.white};
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  width: 560px;
  height: 120px;
  color: ${color.white};
  font-size: 48px;
  line-height: 60px;
  margin-top: 100px;
  margin-left: 152px;
`;

const SearchBox = styled.div`
  width: 368px;
  height: 56px;
  display: flex;
  align-items: center;
  background-color: ${color.shark};
`;

const SearchBar = styled.input`
  appearance: none;
  background: none;
  border: none;
  outline: none;
  width: 320px;
  height: 56px;
  background-color: ${color.shark};
  border-radius: 5px;
  color: white;
  padding-left: 24px;

  ::placeholder {
    color: white;
    line-height: 22px;
    font-weight: bold;
  }
`;

const Filter = styled.div`
  display: flex;
  margin-top: 80px;
  margin-left: 152px;
  margin-right: 152px;
  justify-content: space-between;
`;

const CardPosition = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-left: 152px;
  margin-right: 152px;
  margin-top: 51px;
  margin-bottom: 291px;
`;

export const ErrorPosition = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 200px;
  margin-bottom: 200px;
`;

export default FavoriteWithProviders;
