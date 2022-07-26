import React from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";
import api from "./utils/api";

export default function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [nameInput, setNameInput] = React.useState("");
  const [aboutInput, setAboutInput] = React.useState("");
  const [formNameInput, setFormNameInput] = React.useState({});
  const [formAboutInput, setFormAboutInput] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);

  function handleSubmit(evt) {
    evt.preventDefault();
    setIsLoading(true);

    api
      .editProfileInfo({
        name: nameInput,
        about: aboutInput,
      })
      .then((userInfo) => {
        props.updateUser({
          ...currentUser,
          name: userInfo.name,
          about: userInfo.about,
        });
      })
      .catch((err) => api.reportError(err))
      .finally(() => {
        setIsLoading(false);
        props.onClose();
      });
  }

  function handleChange(evt) {
    const inputProps = {
      input: evt.target,
      valid: evt.target.validity.valid,
      error: evt.target.validationMessage,
    };
    switch (evt.target.id) {
      case "name-input":
        setFormNameInput({
          ...formNameInput,
          input: inputProps.input,
          valid: inputProps.valid,
          error: inputProps.error,
        });
        setNameInput(inputProps.input.value);
        props.checkValidity("edit", [formNameInput, formAboutInput]);
        break;
      case "about-input":
        setFormAboutInput({
          ...formAboutInput,
          input: inputProps.input,
          valid: inputProps.valid,
          error: inputProps.error,
        });
        setAboutInput(inputProps.input.value);
        props.checkValidity("edit", [formNameInput, formAboutInput]);
        break;
    }
  }

  React.useEffect(() => {
    setNameInput(currentUser.name);
    setAboutInput(currentUser.about);
  }, [currentUser, props.isOpen]);

  return (
    <PopupWithForm
      name="edit"
      title="Edit Profile"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      formIsValid={true}
      formInputs={[formNameInput, formAboutInput]}
      setFormInputs={[setFormNameInput, setFormAboutInput]}
      validateForm={props.setFormValidity}
      formInputsSet={[setNameInput, setAboutInput]}
    >
      <input
        value={nameInput || ""}
        type="text"
        name="name"
        id="name-input"
        placeholder="Name"
        minLength="2"
        maxLength="40"
        required
        className={`form__input ${
          formNameInput.valid == false && "form__input_invalid"
        }`}
        onChange={handleChange}
      />
      {!formNameInput.valid && (
        <span className="name-input-error form__input-error">
          {formNameInput.error}
        </span>
      )}
      <input
        value={aboutInput || ""}
        type="text"
        name="about"
        id="about-input"
        placeholder="About me"
        minLength="2"
        maxLength="200"
        required
        className={`form__input ${
          formAboutInput.valid == false && "form__input_invalid"
        }`}
        onChange={handleChange}
      />
      {!formAboutInput.valid && (
        <span className="about-input-error form__input-error">
          {formAboutInput.error}
        </span>
      )}
      <button
        type="submit"
        className={`form__save submit-button ${
          props.formValidity ? "" : "form__save_disabled"
        }`}
        disabled={!props.formValidity}
      >
        {isLoading ? "Saving..." : "Save"}
      </button>
    </PopupWithForm>
  );
}
