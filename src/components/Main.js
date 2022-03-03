import React from "react";
import PropTypes from "prop-types";
import Navbar from "./Navbar";
import Footer from "./Footer";
import styled from "styled-components";

function Main({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

Main.propTypes = {
  children: PropTypes.node,
};

const NavbarPosition = styled.div`
  visibility: visibility;
  @media only screen and (max-width: 850px);
   {
    visibility: hidden;
  }
`;

export { Main };
