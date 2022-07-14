import React from "react";
import FormValidator from "./FormValidator";
import {
  editProfileInputs,
  profileInfoFields,
  config,
} from "./utils/constants";

export default function PopupWithForm(props) {
  React.useEffect(() => {
    if (props.name !== "delete") {
      const formValidator = new FormValidator(
        config,
        `.${props.name}-popup__form`
      );

      formValidator.enableValidation();
      if (props.isOpen) {
        props.fillForm && fillForm();
        formValidator.resetValidation();
      }
    }
  }, [props.isOpen]);

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickClose);
    document.addEventListener("keydown", handleKeyClose);

    return () => {
      document.removeEventListener("mousedown", handleClickClose);
      document.removeEventListener("keydown", handleKeyClose);
    };
  }, []);

  function handleClickClose(evt) {
    const popup = document.querySelector(`.${props.name}-popup`);
    if (evt.target === popup) {
      props.onClose();
    }
  }

  function handleKeyClose(evt) {
    if (evt.key === "Escape") {
      props.onClose();
    }
  }

  function fillForm() {
    editProfileInputs.name.value = profileInfoFields.name.innerHTML;
    editProfileInputs.about.value = profileInfoFields.about.innerHTML;
  }

  return (
    <div
      className={`${props.name}-popup popup ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className={`${props.name}-popup__container popup__container`}>
        <button
          type="button"
          className={`${props.name}-popup__close-button popup__close-button close-button`}
          onClick={props.onClose}
        ></button>
        <h2 className={`${props.name}-popup__title popup__title`}>
          {props.title}
        </h2>
        <form
          className={`form ${props.name}-popup__form`}
          id={`${props.name}-popup__form`}
          noValidate
        >
          <fieldset className="form__fieldset">
            {props.children}
            {props.name === "delete" ? (
              <button
                type="submit"
                id="popup-submit"
                className="delete-popup__confirm-button popup__button submit-button"
                onClick={props.onSubmit}
              >
                Yes
              </button>
            ) : (
              <button
                type="submit"
                className="form__save submit-button"
                onClick={props.onSubmit}
              >
                Save
              </button>
            )}
          </fieldset>
        </form>
      </div>
    </div>
  );
}
