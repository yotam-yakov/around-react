import React from "react";
import FormValidator from "./FormValidator";
import {
  editProfileInputs,
  profileInfoFields,
  config,
} from "./utils/constants";

export default function PopupWithForm(props) {
  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyClose);

    return () => {
      document.removeEventListener("keydown", handleKeyClose);
    };
  }, []);

  function handleKeyClose(evt) {
    if (evt.key === "Escape") {
      props.onClose();
    }
  }

  return (
    <div
      className={`${props.name}-popup popup ${
        props.isOpen ? "popup_opened" : ""
      }`}
      onClick={props.onClose}
    >
      <div
        className={`${props.name}-popup__container popup__container`}
        onClick={(evt) => evt.stopPropagation()}
      >
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
          <fieldset className="form__fieldset">{props.children}</fieldset>
        </form>
      </div>
    </div>
  );
}
