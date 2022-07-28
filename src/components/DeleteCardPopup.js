import React from "react";
import { api } from "./utils/api";
import PopupWithForm from "./PopupWithForm";
import CardsContext from "../contexts/CardsContext";

export default function DeleteCardPopup(props) {
  const [isLoading, setIsLoading] = React.useState(false);
  const cards = React.useContext(CardsContext);

  function submitDeleteCardForm(evt) {
    evt.preventDefault();
    setIsLoading(true);

    api
      .deleteCard(props.deletedCard._id)
      .then(() => {
        props.updateCards(
          cards.filter((card) => card._id !== props.deletedCard._id)
        );
      })
      .catch((err) => api.reportError(err))
      .finally(() => {
        setIsLoading(false);
        props.onClose();
      });
  }

  return (
    <PopupWithForm
      name="delete"
      title="Are You Sure?"
      isOpen={props.deletedCard}
      onSubmit={submitDeleteCardForm}
      onClose={props.onClose}
    >
      <button
        type="submit"
        id="popup-submit"
        className="delete-popup__confirm-button popup__button submit-button"
      >
        {isLoading ? "Deleting..." : "Yes"}
      </button>
    </PopupWithForm>
  );
}
