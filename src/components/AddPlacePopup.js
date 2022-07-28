import React from "react";
import PopupWithForm from "./PopupWithForm";
import { api } from "./utils/api";
import CardsContext from "../contexts/CardsContext";

export default function AddCardPopup(props) {
  const cards = React.useContext(CardsContext);
  const [cardTitle, setCardTitle] = React.useState("");
  const [cardLink, setCardLink] = React.useState("");
  const [formTitleInput, setFormTitleInput] = React.useState({});
  const [formLinkInput, setFormLinkInput] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);

  function isAddCardFormValid() {
    if (!formTitleInput.valid) {
      return false;
    }
    if (!formLinkInput.valid) {
      return false;
    }
    return true;
  }

  function handleChange(evt) {
    const inputProps = {
      input: evt.target,
      valid: evt.target.validity.valid,
      error: evt.target.validationMessage,
    };
    switch (evt.target.id) {
      case "title-input":
        setFormTitleInput({
          ...formTitleInput,
          input: inputProps.input,
          valid: inputProps.valid,
          error: inputProps.error,
        });
        setCardTitle(inputProps.input.value);
        break;
      case "link-input":
        setFormLinkInput({
          ...formLinkInput,
          input: inputProps.input,
          valid: inputProps.valid,
          error: inputProps.error,
        });
        setCardLink(inputProps.input.value);
        break;
    }
  }

  function submitAddPlaceForm(evt) {
    evt.preventDefault();
    setIsLoading(true);

    api
      .addNewCard({ title: cardTitle, link: cardLink })
      .then((newCard) => {
        props.updateCards([newCard, ...cards]);
      })
      .catch((err) => api.reportError(err))
      .finally(() => {
        setIsLoading(false);
        props.onClose();
      });
  }

  React.useEffect(() => {
    setCardTitle("");
    setCardLink("");
    setFormTitleInput({});
    setFormLinkInput({});
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="add"
      title="New Place"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={submitAddPlaceForm}
    >
      <input
        value={cardTitle || ""}
        type="text"
        name="title"
        id="title-input"
        placeholder="Title"
        minLength="1"
        maxLength="30"
        required
        className={`form__input ${
          formTitleInput.valid === false && "form__input_invalid"
        }`}
        onChange={handleChange}
      />
      {!formTitleInput.valid && (
        <span className="title-input-error form__input-error">
          {formTitleInput.error}
        </span>
      )}
      <input
        value={cardLink || ""}
        type="url"
        name="link"
        id="link-input"
        placeholder="Image link"
        required
        className={`form__input ${
          formLinkInput.valid === false && "form__input_invalid"
        }`}
        onChange={handleChange}
      />
      {!formLinkInput.valid && (
        <span className="link-input-error form__input-error">
          {formLinkInput.error}
        </span>
      )}
      <button
        type="submit"
        className={`form__save submit-button ${
          isAddCardFormValid() ? "" : "form__save_disabled"
        }`}
        disabled={!isAddCardFormValid()}
      >
        {isLoading ? "Saving..." : "Save"}
      </button>
    </PopupWithForm>
  );
}
