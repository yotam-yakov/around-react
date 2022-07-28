import React from "react";
import PopupWithForm from "./PopupWithForm";
import api from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function EditAvatarPopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [avatarLink, setAvatarLink] = React.useState("");
  const [formAvatarInput, setFormAvatarInput] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const avatarInputRef = React.useRef();

  function handleChange(evt) {
    const inputProps = {
      input: evt.target,
      valid: evt.target.validity.valid,
      error: evt.target.validationMessage,
    };

    setFormAvatarInput({
      ...formAvatarInput,
      input: inputProps.input,
      valid: inputProps.valid,
      error: inputProps.error,
    });
    setAvatarLink(inputProps.input.value);
  }

  function submitEditAvatarForm(evt) {
    evt.preventDefault();
    setIsLoading(true);

    api
      .editProfilePicture(avatarInputRef.current.value)
      .then((userInfo) => {
        props.updateUser({ ...currentUser, avatar: userInfo.avatar });
      })
      .catch((err) => api.reportError(err))
      .finally(() => {
        setIsLoading(false);
        props.onClose();
      });
  }

  React.useEffect(() => {
    setAvatarLink("");
    setFormAvatarInput({});
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="avatar"
      title="Change Profile Picture"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={submitEditAvatarForm}
    >
      <input
        value={avatarLink || ""}
        ref={avatarInputRef}
        type="url"
        name="avatar"
        id="avatar-input"
        placeholder="Image link"
        required
        className={`form__input ${
          formAvatarInput.valid === false && "form__input_invalid"
        }`}
        onChange={handleChange}
      />
      {!formAvatarInput.valid && (
        <span className="avatar-input-error form__input-error">
          {formAvatarInput.error}
        </span>
      )}
      <button
        type="submit"
        className={`form__save submit-button ${
          !formAvatarInput.valid && "form__save_disabled"
        }`}
        disabled={!formAvatarInput.valid}
      >
        {isLoading ? "Saving..." : "Save"}
      </button>
    </PopupWithForm>
  );
}
