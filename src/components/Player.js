import { CircularProgress } from "@mui/material";
import React from "react";
import ReactPlayer from "react-player";
import { useGetMovieById } from "../hooks/useGetMovieById";
import { Error } from "./Header";

function Player({ player, id }) {
  const { movie, loading, error } = useGetMovieById({ id });
  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Error>Trailer dose not exist</Error>
      ) : (
        <ReactPlayer url={movie.trailer} playing={player} />
      )}
    </div>
  );
}

export default Player;
