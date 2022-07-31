import React from "react";
import PopupWithForm from "./PopupWithForm";
import CardsContext from "../contexts/CardsContext";
import LoadingFormContext from "../contexts/LoadingFormContext";

export default function DeleteCardPopup(props) {
  const cards = React.useContext(CardsContext);
  const isLoading = React.useContext(LoadingFormContext);

  function submitDeleteCardForm(evt) {
    evt.preventDefault();
    props.setLoadingState(true);

    props
      .submitRequest(props.deletedCard._id)
      .then(() => {
        props.updateCards(
          cards.filter((card) => card._id !== props.deletedCard._id)
        );
        props.onClose();
      })
      .catch((err) => props.requestError(err))
      .finally(() => {
        props.setLoadingState(false);
      });
  }

  return (
    <PopupWithForm
      name="delete"
      title="Are You Sure?"
      isOpen={props.deletedCard}
      isFormValid={true}
      onSubmit={submitDeleteCardForm}
      onClose={props.onClose}
      submitText={isLoading ? "Deleting..." : "Yes"}
    ></PopupWithForm>
  );
}
