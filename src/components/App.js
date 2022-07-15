import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "./utils/api";
import "../index.css";

function App() {
  //STATE VARIABLES
  //Popups toggles
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  //Card selectors
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [deletedCard, setDeletedCard] = React.useState(null);
  //Server data
  const [userInfo, setUserInfo] = React.useState({});
  const [cards, setCards] = React.useState([]);
  //Inputs states
  const [formNameInput, setFormNameInput] = React.useState({
    input: { value: userInfo.name },
  });
  const [formAboutInput, setFormAboutInput] = React.useState({});
  const [formTitleInput, setFormTitleInput] = React.useState({});
  const [formLinkInput, setFormLinkInput] = React.useState({});
  const [formAvatarInput, setFormAvatarInput] = React.useState({});
  //Edit form states
  const [profileName, setProfileName] = React.useState("");
  const [profileAbout, setProfileAbout] = React.useState("");

  //FUNCTIONS
  //Popup opening handlers
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  //Popup closing handler
  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setSelectedCard(null);
    setDeletedCard(null);

    resetFormValues();
  }

  function resetFormValues() {
    setFormNameInput({});
    setFormAboutInput({});
    setFormAvatarInput({});
    setFormTitleInput({});
    setFormLinkInput({});

    document.querySelectorAll(".form").forEach((form) => {
      form.reset();
    });
  }
  //Popup submit handlers
  function submitEditProfileForm(evt) {
    evt.preventDefault();
    updateSaveButton(true, ".edit-popup");

    const editProfileFormInputs = {
      name: document.querySelector("#name-input").value,
      about: document.querySelector("#about-input").value,
    };

    api
      .editProfileInfo(editProfileFormInputs)
      .then((userParameters) => {
        setUserInfo({
          ...userInfo,
          name: userParameters.name,
          about: userParameters.about,
        });
        setProfileName(userParameters.name);
        setProfileAbout(userParameters.about);
      })
      .catch((err) => api.reportError(err))
      .finally(() => {
        updateSaveButton(false, ".edit-popup");
        closeAllPopups();
      });
  }

  function submitEditAvatarForm(evt) {
    evt.preventDefault();
    updateSaveButton(true, ".avatar-popup");

    const editAvatarFormInput = document.querySelector("#avatar-input").value;

    api
      .editProfilePicture(editAvatarFormInput)
      .then((userParameters) => {
        setUserInfo({ ...userInfo, avatar: userParameters.avatar });
        setProfileName(userParameters.name);
        setProfileAbout(userParameters.about);
      })
      .catch((err) => api.reportError(err))
      .finally(() => {
        updateSaveButton(false, ".avatar-popup");
        closeAllPopups();
      });
  }

  function submitAddPlaceForm(evt) {
    evt.preventDefault();
    updateSaveButton(true, ".add-popup");

    const addCardFormInputs = {
      title: document.querySelector("#title-input").value,
      link: document.querySelector("#link-input").value,
    };

    api
      .addNewCard(addCardFormInputs)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .catch((err) => api.reportError(err))
      .finally(() => {
        updateSaveButton(false, ".add-popup");
        closeAllPopups();
      });
  }

  function submitDeleteCardForm(evt) {
    evt.preventDefault();
    updateSaveButton(true, ".delete-popup");

    api
      .deleteCard(deletedCard._id)
      .then(() => {
        api.loadCards().then((data) => {
          setCards(data);
        });
      })
      .catch((err) => api.reportError(err))
      .finally(() => {
        updateSaveButton(false, ".delete-popup");
        closeAllPopups();
      });
  }

  //Other functions
  function handleLikeClick(cardId, method) {
    api
      .changeCardLike(cardId, method)
      .then(() => {
        api.loadCards().then((data) => {
          setCards(data);
        });
      })
      .catch((err) => api.reportError(err));
  }

  function updateInputs(evt) {
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
        setProfileName(inputProps.input.value);
        break;
      case "about-input":
        setFormAboutInput({
          ...formAboutInput,
          input: inputProps.input,
          valid: inputProps.valid,
          error: inputProps.error,
        });
        setProfileAbout(inputProps.input.value);
        break;
      case "title-input":
        setFormTitleInput({
          ...formTitleInput,
          input: inputProps.input,
          valid: inputProps.valid,
          error: inputProps.error,
        });
        break;
      case "link-input":
        setFormLinkInput({
          ...formLinkInput,
          input: inputProps.input,
          valid: inputProps.valid,
          error: inputProps.error,
        });
        break;
      case "avatar-input":
        setFormAvatarInput({
          ...formAvatarInput,
          input: inputProps.input,
          valid: inputProps.valid,
          error: inputProps.error,
        });
        break;
    }
  }

  function isFormValid(...inputs) {
    for (let i = 0; i < inputs.length; i++) {
      if (!inputs[i].valid) {
        return false;
      }
    }
    return true;
  }

  function updateSaveButton(isSaving, formSelector) {
    const form = document.querySelector(formSelector);
    const submitButton = form.querySelector(".submit-button");
    if (isSaving) {
      submitButton.textContent = "Saving...";
    } else {
      if (formSelector === ".delete-popup") {
        submitButton.textContent = "Yes";
      } else {
        submitButton.textContent = "Save";
      }
    }
  }

  function loadServerData() {
    api
      .getAllInfo()
      .then(([userData, cards]) => {
        setUserInfo({
          ...userInfo,
          name: userData.name,
          about: userData.about,
          avatar: userData.avatar,
          id: userData._id,
        });
        setProfileName(userData.name);
        setProfileAbout(userData.about);
        setCards(cards);
      })
      .catch((err) => api.reportError(err));
  }

  return (
    <div className="page">
      {/* Main page content */}
      <Header />
      <Main
        onEditProfileClick={handleEditProfileClick}
        onAddPlaceClick={handleAddPlaceClick}
        onEditAvatarClick={handleEditAvatarClick}
        onCardClick={setSelectedCard}
        onCardDelete={setDeletedCard}
        onLikeClick={handleLikeClick}
        onMount={loadServerData}
        userData={userInfo}
        cardsList={cards}
      />
      <Footer />

      {/* Popups */}
      <PopupWithForm
        name="edit"
        title="Edit Profile"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        profileName={profileName}
      >
        <input
          value={profileName}
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
          onChange={updateInputs}
        />
        {!formNameInput.valid && (
          <span className="name-input-error form__input-error">
            {formNameInput.error}
          </span>
        )}
        <input
          value={profileAbout}
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
          onChange={updateInputs}
        />
        {!formAboutInput.valid && (
          <span className="about-input-error form__input-error">
            {formAboutInput.error}
          </span>
        )}
        <button
          type="submit"
          className="form__save submit-button"
          onClick={submitEditProfileForm}
        >
          Save
        </button>
      </PopupWithForm>
      <PopupWithForm
        name="avatar"
        title="Change Profile Picture"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onSubmit={submitEditAvatarForm}
      >
        <input
          type="url"
          name="avatar"
          id="avatar-input"
          placeholder="Image link"
          required
          className={`form__input ${
            formAvatarInput.valid == false && "form__input_invalid"
          }`}
          onChange={updateInputs}
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
          onClick={submitEditAvatarForm}
          disabled={!formAvatarInput.valid}
        >
          Save
        </button>
      </PopupWithForm>
      <PopupWithForm
        name="add"
        title="New Place"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          type="text"
          name="title"
          id="title-input"
          placeholder="Title"
          minLength="1"
          maxLength="30"
          required
          className={`form__input ${
            formTitleInput.valid == false && "form__input_invalid"
          }`}
          onChange={updateInputs}
        />
        {!formTitleInput.valid && (
          <span className="title-input-error form__input-error">
            {formTitleInput.error}
          </span>
        )}
        <input
          type="url"
          name="link"
          id="link-input"
          placeholder="Image link"
          required
          className={`form__input ${
            formLinkInput.valid == false && "form__input_invalid"
          }`}
          onChange={updateInputs}
        />
        {!formLinkInput.valid && (
          <span className="link-input-error form__input-error">
            {formLinkInput.error}
          </span>
        )}
        <button
          type="submit"
          className={`form__save submit-button ${
            isFormValid(formTitleInput, formLinkInput)
              ? ""
              : "form__save_disabled"
          }`}
          onClick={submitAddPlaceForm}
          disabled={isFormValid(formTitleInput, formLinkInput)}
        >
          Save
        </button>
      </PopupWithForm>
      <PopupWithForm
        name="delete"
        isOpen={deletedCard}
        onSubmit={submitDeleteCardForm}
        title="Are You Sure?"
      >
        <button
          type="submit"
          id="popup-submit"
          className="delete-popup__confirm-button popup__button submit-button"
          onClick={submitDeleteCardForm}
        >
          Yes
        </button>
      </PopupWithForm>
      <ImagePopup name="image" card={selectedCard} onClose={closeAllPopups} />
    </div>
  );
}

export default App;
