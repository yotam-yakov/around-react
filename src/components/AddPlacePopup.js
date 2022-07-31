import React from "react";
import PopupWithForm from "./PopupWithForm";
import CardsContext from "../contexts/CardsContext";
import LoadingFormContext from "../contexts/LoadingFormContext";
import useFormValidation from "../hooks/formValidatorHook";

export default function AddCardPopup(props) {
  const cards = React.useContext(CardsContext);
  const isLoading = React.useContext(LoadingFormContext);
  const { values, handleChange, errors, isValid, resetForm } =
    useFormValidation();

  function submitAddPlaceForm(evt) {
    evt.preventDefault();
    props.setLoadingState(true);

    props
      .submitRequest({ title: values.title, link: values.link })
      .then((newCard) => {
        props.updateCards([newCard, ...cards]);
        props.onClose();
      })
      .catch((err) => props.requestError(err))
      .finally(() => {
        props.setLoadingState(false);
      });
  }

  React.useEffect(() => {
    resetForm();
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="add"
      title="New Place"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={submitAddPlaceForm}
      isFormValid={isValid}
      submitText={isLoading ? "Saving..." : "Save"}
    >
      <input
        value={values.title || ""}
        type="text"
        name="title"
        id="title-input"
        placeholder="Title"
        minLength="1"
        maxLength="30"
        required
        className={`form__input ${errors.title && "form__input_invalid"}`}
        onChange={handleChange}
      />
      {errors.title && (
        <span className="title-input-error form__input-error">
          {errors.title}
        </span>
      )}
      <input
        value={values.link || ""}
        type="url"
        name="link"
        id="link-input"
        placeholder="Image link"
        required
        className={`form__input ${errors.link && "form__input_invalid"}`}
        onChange={handleChange}
      />
      {errors.link && (
        <span className="link-input-error form__input-error">
          {errors.link}
        </span>
      )}
    </PopupWithForm>
  );
}
