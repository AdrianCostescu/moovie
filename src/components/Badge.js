import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { color } from "../styles/color";

export function Badge({ count, children }) {
  return (
    <Wrapper>
      {children}
      {count ? <Dot>{count}</Dot> : null}
    </Wrapper>
  );
}

// TODO: read about proptypes
Badge.propTypes = {
  count: PropTypes.number,
  children: PropTypes.node,
};

const Wrapper = styled.div`
  position: relative;
`;

const Dot = styled.span`
  position: absolute;
  top: 12px;
  right: -16px;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${color.redRibbon};
  font-size: 10px;
`;
