import React from "react";
import * as SC from "./styles";

export const Modal = ({ text, buttons }) => (
  <SC.ModalWrapper>
    <SC.Modal>
      <SC.ModalText>{text}</SC.ModalText>
      <SC.ModalContent>{buttons}</SC.ModalContent>
    </SC.Modal>
  </SC.ModalWrapper>
);
