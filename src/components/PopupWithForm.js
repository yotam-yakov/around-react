import React from "react";

export default function PopupWithForm(props) {
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
          onSubmit={props.onSubmit}
          noValidate
        >
          <fieldset className="form__fieldset">
            {props.children}
            <button
              type="submit"
              id="popup-submit"
              className={`form__save submit-button ${
                props.isFormValid ? "" : "form__save_disabled"
              }`}
              disabled={!props.isFormValid}
            >
              {props.submitText}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
