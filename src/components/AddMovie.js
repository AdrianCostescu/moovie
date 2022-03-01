import React, { useState } from "react";
import { color } from "../styles/color";
import styled from "styled-components";
import { usePostVideoMutation } from "../hooks/usePostVideoMutation";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";

const CATEGORIES = ["Adventure", "Action"];

const AddMovie = ({ handleCancel }) => {
  const [types, setTypes] = useState([]);

  const [addMovie] = usePostVideoMutation();

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const input = Object.fromEntries(formData);

    const response = await addMovie({
      variables: {
        input: { ...input, type: types },
      },
    }).catch((error) => {
      console.error(error);
      return error;
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
          <Input name="cover" width="560px" type="text"></Input>
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
          <Button background="#F5044C" color="#ffffff" type="submit">
            Add movie
          </Button>
          <Button
            background="#fff"
            color="#010103"
            type="submit"
            onClick={handleCancel}
          >
            Cancel
          </Button>
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
  border: 1px solid #9c9b9b;
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
  border: 1px solid #9c9b9b;
  box-sizing: border-box;
  border-radius: 8px;
`;

const Option = styled.option``;

const Button = styled.button`
  appearance: none;
  background: none;
  border: none;
  outline: none;
  width: 561px;
  height: 48px;
  border-radius: 8px;
  background-color: ${(props) => props.background};
  color: ${(props) => props.color};
  font-size: 18px;
  line-height: 25px;
  font-weight: bold;
`;

const ButtonPosition = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 90px;
  margin-bottom: 74px;
`;
export default AddMovie;
