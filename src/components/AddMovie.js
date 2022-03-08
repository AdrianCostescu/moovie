import React, { useState } from "react";
import PropTypes from "prop-types";
import { color } from "../styles/color";
import styled from "styled-components";
import { usePostVideoMutation } from "../hooks/usePostVideoMutation";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import { PrimaryButton, TransparentButton } from "./core/Button";
import { CATEGORIES } from "../constants";

const AddMovie = ({ handleCancel, onSuccesAdd }) => {
  AddMovie.propTypes = {
    handleCancel: PropTypes.func,
    onSuccesAdd: PropTypes.func,
  };
  const [types, setTypes] = useState([]);
  const [images, setImage] = useState([]);
  const [addMovie, response] = usePostVideoMutation();

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const input = Object.fromEntries(formData);

    const response = await addMovie({
      variables: {
        input: { ...input, type: types, image: images },
      },
    })
      .catch((error) => {
        console.error(error);
        return error;
      })
      .then((response) => {
        if (response.data.postVideo) {
          onSuccesAdd();
        }

        handleCancel();
      });
  }

  function handleTypeChange({ target: { value } }) {
    setTypes(value);
  }

  return (
    <AddBox>
      <Title>Add movie</Title>
      <Form onSubmit={handleSubmit}>
        <Position>
          <Label>
            Movie title
            <Input name="title" width="276px" type="text" required></Input>
          </Label>
          <Label>
            Trailer URL
            <Input name="trailer" width="276px" type="text" required></Input>
          </Label>
        </Position>
        <Label>
          Original source
          <Input name="source" width="560px" type="text" required></Input>
        </Label>
        <Label>
          Cover URL
          <Input
            width="560px"
            type="text"
            value={images}
            onChange={(e) => setImage([e.target.value])}
          ></Input>
        </Label>
        <Label>
          Description
          <Textarea name="description"></Textarea>
        </Label>
        <Position>
          <Label>
            Category
            <Select
              multiple
              value={types}
              onChange={handleTypeChange}
              renderValue={(selected) => selected.join(", ")}
              sx={{ width: "315px", height: "48px" }}
            >
              {CATEGORIES.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={types.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </Label>
          <Label>
            IMDB Score
            <Input name="score" width="233px" type="text"></Input>
          </Label>
        </Position>
        <Label>
          Release data
          <Input name="release" width="560px" type="text"></Input>
        </Label>
        <ButtonPosition>
          <PrimaryButton flex type="submit">
            Add movie
          </PrimaryButton>
          <TransparentButton flex onClick={handleCancel}>
            Cancel
          </TransparentButton>
        </ButtonPosition>
      </Form>
    </AddBox>
  );
};

const AddBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${color.white};
  padding: 0 192px;
`;

const Title = styled.h1`
  font-size: 36px;
  line-height: 60px;
  color: ${color.ebony};
  margin-top: 68px;
  margin-bottom: 114px;
`;

const Form = styled.form``;

const Label = styled.label`
  font-family: SF Pro Display;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  color: ${color.ebony};
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 24px;
`;

const Input = styled.input`
  height: 48px;
  width: ${(props) => props.width};
  border: 1px solid ${color.dustyGray};
  box-sizing: border-box;
  border-radius: 8px;
`;

const Position = styled.div`
  display: flex;
  gap: 9px;
`;

const Textarea = styled.textarea`
  width: 560px;
  height: 159px;
  border: 1px solid ${color.dustyGray};
  box-sizing: border-box;
  border-radius: 8px;
`;

const ButtonPosition = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 90px;
  margin-bottom: 74px;
`;

export default AddMovie;
