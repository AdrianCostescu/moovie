import React from "react";
import styled from "styled-components";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { CloseIcon } from "./icons/CloseIcon";
import { color } from "../styles/color";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Modal({ open, children, onClose }) {
  return (
    <Dialog
      aria-describedby="alert-dialog-slide-description"
      open={open}
      TransitionComponent={Transition}
      keepMounted
      maxWidth={true}
      onClose={onClose}
    >
      {children}
    </Dialog>
  );
}

const ModalContent = styled.div`
  position: relative;
  max-width: ${(props) => props.maxWidth};
`;

function ModalCloseButton({ onClose }) {
  return (
    <CloseButton onClick={onClose} style={{}}>
      <CloseIcon />
    </CloseButton>
  );
}

const ModalTitle = styled.h1`
  font-size: 36px;
  line-height: 52px;
  text-align: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 33px;
  right: 33px;
  z-index: 99;
  border: none;
  margin: 0;
  padding: 0;
  background: transparent;
`;

const ModalPrimaryButton = styled.button`
  background-color: ${color.redRibbon};
  padding: 12px 63px;
  border-radius: 8px;
  border: none;
  margin: 0;
  color: white;
`;

const ModalSecondaryButton = styled.button`
  background-color: transparent;
  color: ${color.black};
  padding: 12px 63px;
  border-radius: 8px;
  margin: 0;
  border: 1px solid ${color.black};
`;

export {
  ModalCloseButton,
  ModalTitle,
  ModalContent,
  ModalPrimaryButton,
  ModalSecondaryButton,
};
export default Modal;
