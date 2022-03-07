import React from "react";
import PropTypes from "prop-types";
import Navbar from "./Navbar";
import Footer from "./Footer";

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

export { Main };
