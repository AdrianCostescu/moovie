import React from "react";
import styled from "styled-components";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function Select() {
  return (
    <Form>
      <SelectItem>
        <Item value="Adventure">Adventure</Item>
        <Item value="Adventure">Adventure</Item>
        <Item value="Adventure">Adventure</Item>
        <Item value="Adventure">Adventure</Item>
        <Item value="Adventure">Adventure</Item>
      </SelectItem>
      <Arrow>
        <ArrowForwardIosIcon sx={{ fontSize: "16px" }} />
      </Arrow>
    </Form>
  );
}

const Form = styled.form`
  position: relative;
  width: 158px;
  height: 40px;
`;

const SelectItem = styled.select`
  appearance: none;
  width: 158px;
  height: 40px;
  background-color: #f5044c;
  padding-left: 16px;
  color: #fff;
  border: 0px;
  border-radius: 8px;
`;

const Item = styled.option`
  appearance: none;
  width: 158px;
  height: 40px;
  background-color: #f5044c;
`;

const Arrow = styled.span`
  height: 40px;
  position: absolute;
  left: 110px;
  color: white;
  transform: rotate(90deg);
  pointer-events: none;
`;

export default Select;
