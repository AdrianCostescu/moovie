import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { color } from "../styles/color";
import Delete from "../img/delete.png";
import Edit from "../img/edit.png";
import Modal, {
  ModalCloseButton,
  ModalTitle,
  ModalContent,
  ModalPrimaryButton,
  ModalSecondaryButton,
} from "../components/Modal";
import { useDeleteMovieById } from "../hooks/useDeleteMovieById";

const AdministratorCard = ({ img, title, data, type, id, onDeleteSuccess }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteMovie, response] = useDeleteMovieById();

  async function handleDeleteMovie() {
    const response = await deleteMovie({
      variables: {
        id,
      },
    }).catch((error) => {
      console.error(error);

      return error;
    });
  }
  useEffect(() => {
    if (response?.data?.deleteMovieById) {
      setIsDeleteModalOpen(false);
      onDeleteSuccess();
    }
  }, [response]);

  return (
    <>
      <CardBox>
        <Img src={img}></Img>
        <Title>{title}</Title>
        <Data>{data}</Data>
        <Type>{type.slice(0, 2).join(" • ")}</Type>
        <Icon src={Delete} onClick={() => setIsDeleteModalOpen(true)}></Icon>
        <Icon src={Edit}></Icon>
      </CardBox>

      <Modal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <StyledModalContent maxWidth="400px">
          <ModalCloseButton onClose={() => setIsDeleteModalOpen(false)} />
          <ModalTitle>Are you sure you want to delete this movie?</ModalTitle>

          <ModalSecondaryButton onClick={() => setIsDeleteModalOpen(false)}>
            Cancel
          </ModalSecondaryButton>

          <ModalPrimaryButton onClick={() => handleDeleteMovie()}>
            Confirm
          </ModalPrimaryButton>
        </StyledModalContent>
      </Modal>
    </>
  );
};

const CardBox = styled.div`
  width: 1136px;
  height: 144px;
  background-color: ${color.white};
  box-shadow: 0px 4px 60px rgba(163, 163, 163, 0.1);
  border-radius: 8px;
  display: flex;
  align-items: center;
`;

const Img = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  margin-left: 32px;
`;

const Title = styled.h1`
  color: ${color.black};
  width: 196px;
  height: 80px;
  font-size: 24px;
  line-height: 33px;
  margin-left: 16px;
  display: flex;
  align-items: center;
`;

const Data = styled.p`
  color: ${color.black};
  width: 130px;
  height: 144px;
  font-size: 18px;
  line-height: 25px;
  opacity: 0.6;
  margin-left: 106px;
  display: flex;
  align-items: center;
`;

const Type = styled.p`
  color: ${color.black};
  width: 180px;
  height: 144px;
  font-size: 18px;
  line-height: 25px;
  opacity: 0.6;
  margin-left: 112px;
  margin-right: 195px;
  display: flex;
  align-items: center;
`;

const Icon = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 32px;
  display: flex;
  align-items: center;
  opacity: 0.6;
`;

const StyledModalContent = styled(ModalContent)`
  padding: 104px 182px;
`;

export default AdministratorCard;
