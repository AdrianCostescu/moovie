import React from "react";
import styled from "styled-components";

const EditMoviePage = styled`
    display: flex;
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

const Textarea = styled.textarea`
  width: 560px;
  height: 159px;
  border: 1px solid #9c9b9b;
  box-sizing: border-box;
  border-radius: 8px;
`;

const EditMovie = () => {
  return (
    <Form>
      <Label>
        Movie title
        <Input name="title" width="276px" type="text" required></Input>
      </Label>
      <Label>
        Trailer URL
        <Input name="trailer" width="276px" type="text" required></Input>
      </Label>
      <Label>
        Description
        <Textarea name="description"></Textarea>
      </Label>
    </Form>
  );
};

export default EditMovie;
