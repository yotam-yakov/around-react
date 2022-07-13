import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import "../index.css";

function App() {
  const [isEditProfilePopupOpen, toggleEditProfilePopup] =
    React.useState(false);
  const [isAddPlacePopupOpen, toggleAddPlacePopup] = React.useState(false);
  const [isEditAvatarPopupOpen, toggleEditAvatarPopup] = React.useState(false);

  function handleEditAvatarClick() {
    toggleEditAvatarPopup(true);
  }

  function handleEditProfileClick() {
    toggleEditProfilePopup(true);
  }

  function handleAddPlaceClick() {
    toggleAddPlacePopup(true);
  }

  function closeAllPopups() {
    toggleAddPlacePopup(false);
    toggleEditAvatarPopup(false);
    toggleEditProfilePopup(false);
  }

  return (
    <div className="page">
      <Header />
      <Main
        onEditProfileClick={handleEditProfileClick}
        onAddPlaceClick={handleAddPlaceClick}
        onEditAvatarClick={handleEditAvatarClick}
        onCardClick=""
      />
      <Footer />
      <PopupWithForm
        name="edit"
        title="Edit Profile"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <fieldset className="form__fieldset">
          <input
            type="text"
            name="name"
            id="name-input"
            placeholder="Name"
            minLength="2"
            maxLength="40"
            required
            className="form__input"
          />
          <span className="name-input-error form__input-error"></span>
          <input
            type="text"
            name="about"
            id="about-input"
            placeholder="About me"
            minLength="2"
            maxLength="200"
            required
            className="form__input"
          />
          <span className="about-input-error form__input-error"></span>
          <button type="submit" className="form__save submit-button">
            Save
          </button>
        </fieldset>
      </PopupWithForm>
      <PopupWithForm
        name="avatar"
        title="Change Profile Picture"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <fieldset className="form__fieldset">
          <input
            type="url"
            name="avatar"
            id="avatar-input"
            placeholder="Image link"
            required
            className="form__input"
          />
          <span className="avatar-input-error form__input-error"></span>
          <button type="submit" className="form__save submit-button">
            Save
          </button>
        </fieldset>
      </PopupWithForm>
      <PopupWithForm
        name="add"
        title="New Place"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <fieldset className="form__fieldset">
          <input
            type="text"
            name="title"
            id="title-input"
            placeholder="Title"
            minLength="1"
            maxLength="30"
            required
            className="form__input"
          />
          <span className="title-input-error form__input-error"></span>
          <input
            type="url"
            name="link"
            id="link-input"
            placeholder="Image link"
            required
            className="form__input"
          />
          <span className="link-input-error form__input-error"></span>
          <button type="submit" className="form__save submit-button">
            Save
          </button>
        </fieldset>
      </PopupWithForm>
      <ImagePopup />
      <PopupWithForm name="delete" title="Are You Sure?">
        <button
          type="submit"
          id="popup-submit"
          className="delete-popup__confirm-button popup__button submit-button"
        >
          Yes
        </button>
      </PopupWithForm>
    </div>
  );
}

export default App;
