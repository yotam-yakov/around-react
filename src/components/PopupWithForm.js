import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function PopupWithForm(props) {
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyClose);

    return () => {
      document.removeEventListener("keydown", handleKeyClose);
    };
  }, []);

  React.useEffect(() => {
    props.formValidator !== undefined && props.formValidator(props.name);
  }, [props.formInputs]);

  React.useEffect(() => {
    // if (props.formInputsSet) {
    //   props.formInputsSet[0](currentUser.name);
    //   props.formInputsSet[1](currentUser.about);
    // }
    props.validateForm !== undefined && props.validateForm(props.formIsValid);
    props.formIsValid &&
      props.setFormInputs.forEach((setInput) => setInput({ valid: true }));
  }, [props.isOpen]);

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
          onSubmit={props.onSubmit}
          noValidate
        >
          <fieldset className="form__fieldset">{props.children}</fieldset>
        </form>
      </div>
    </div>
  );
}
