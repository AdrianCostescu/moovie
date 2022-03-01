import styled from "styled-components";
import React, { useState } from "react";
import AdministratorCard from "../components/AdministratorCard";
import { color } from "../styles/color";
import { useGetMovies } from "../hooks/useGetMovies";
import CircularProgress from "@mui/material/CircularProgress";
import { Error } from "../components/Header";
import { AiOutlineSearch } from "react-icons/ai";
import AddMovie from "../components/AddMovie";
import NavbarAdmin from "../components/NavbarAdmin";
import Modal from "../components/Modal";

const Administrator = () => {
  const { movies, error, loading, refetch } = useGetMovies();
  const [isAddMovieModalOpen, setIsAddMovieModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <AdministratorBox>
      <NavbarAdmin></NavbarAdmin>

      <Modal
        open={isAddMovieModalOpen}
        onClose={() => setIsAddMovieModalOpen(false)}
      >
        <AddMovie handleCancel={() => setIsAddMovieModalOpen(false)}></AddMovie>
      </Modal>

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
        <Button onClick={() => setIsAddMovieModalOpen(true)}>Add new</Button>
      </Filter>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Error>There was a network error. Please try again.</Error>
      ) : (
        movies
          .filter((val) => {
            if (searchTerm === "") {
              return val;
            } else if (
              val.title.toLowerCase().includes(searchTerm.toLocaleLowerCase())
            ) {
              return val;
            }
          })
          .map((movie) => {
            return (
              <AdministratorCard
                id={movie.id}
                key={movie.id}
                img={movie.image?.[0]}
                title={movie.title}
                data={movie.release}
                type={movie.type}
                onDeleteSuccess={refetch}
              />
            );
          })
      )}
    </AdministratorBox>
  );
};

const AdministratorBox = styled.div`
  background-color: ${color.mercury};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding-bottom: 234px;
`;

const SearchBox = styled.div`
  width: 367px;
  height: 48px;
  display: flex;
  align-items: center;
  background-color: ${color.white};
  border: 1px solid #9c9b9b;
  border-radius: 5px;
`;

const SearchBar = styled.input`
  appearance: none;
  background: none;
  border: none;
  outline: none;
  width: 320px;
  height: 21px;
  background-color: ${color.white};
  color: black;
  opacity: 0.6;
  padding-left: 24px;

  ::placeholder {
    color: black;
    font-size: 18px;
    line-height: 21px;
    font-weight: bold;
  }
`;

const Button = styled.button`
  appearance: none;
  background: none;
  border: none;
  outline: none;
  width: 176px;
  height: 48px;
  border-radius: 8px;
  background-color: ${color.redRibbon};
  color: ${color.white};
  font-size: 18px;
  line-height: 25px;
  font-weight: bold;
`;

const Filter = styled.div`
  width: 1136px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 52px;
  margin-top: 134px;
`;

export default Administrator;
