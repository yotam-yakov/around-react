import React from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";
import LoadingFormContext from "../contexts/LoadingFormContext";
import useFormValidation from "../hooks/formValidatorHook";

export default function EditAvatarPopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isLoading = React.useContext(LoadingFormContext);
  const { values, handleChange, errors, isValid, resetForm } =
    useFormValidation();

  function submitEditAvatarForm(evt) {
    evt.preventDefault();
    props.setLoadingState(true);

    props
      .submitRequest(values.avatar)
      .then((userInfo) => {
        props.updateUser({ ...currentUser, avatar: userInfo.avatar });
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
      name="avatar"
      title="Change Profile Picture"
      isOpen={props.isOpen}
      isFormValid={isValid}
      onClose={props.onClose}
      onSubmit={submitEditAvatarForm}
      submitText={isLoading ? "Saving..." : "Save"}
    >
      <input
        value={values.avatar || ""}
        type="url"
        name="avatar"
        id="avatar-input"
        placeholder="Image link"
        required
        className={`form__input ${errors.avatar && "form__input_invalid"}`}
        onChange={handleChange}
      />
      {errors.avatar && (
        <span className="avatar-input-error form__input-error">
          {errors.avatar}
        </span>
      )}
    </PopupWithForm>
  );
}
