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
import { PrimaryButton } from "../components/core/Button";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { UserContextProvider } from "../context/UserContext";

const SNACKBAR_DURATION = 6000;

function AdministratorWithProviders({ children }) {
  return (
    <UserContextProvider>
      <Administrator>{children}</Administrator>
    </UserContextProvider>
  );
}

const Administrator = () => {
  const { movies, error, loading, refetch } = useGetMovies();
  const [isAddMovieModalOpen, setIsAddMovieModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [hasMovieBeenAdded, setHasMovieBeenAdded] = useState(false);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const handleClose = (event, reason) => {
    setHasMovieBeenAdded(false);
  };

  return (
    <AdministratorBox>
      <NavbarAdmin></NavbarAdmin>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={hasMovieBeenAdded}
          autoHideDuration={SNACKBAR_DURATION}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Movie has been added.
          </Alert>
        </Snackbar>
      </Stack>
      <Modal
        open={isAddMovieModalOpen}
        onClose={() => setIsAddMovieModalOpen(false)}
      >
        <AddMovie
          handleCancel={() => setIsAddMovieModalOpen(false)}
          onSuccesAdd={() => {
            setHasMovieBeenAdded(true);
            refetch();
          }}
        ></AddMovie>
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
        <PrimaryButton onClick={() => setIsAddMovieModalOpen(true)}>
          Add new
        </PrimaryButton>
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
  border: 1px solid ${color.dustyGray};
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

const Filter = styled.div`
  width: 1136px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 52px;
  margin-top: 134px;
`;

export default AdministratorWithProviders;
