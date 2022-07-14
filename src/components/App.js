import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import { updateSaveButton } from "../utils/utils";
import userInfo from "./UserInfo";
import "../index.css";

function App() {
  const [isEditProfilePopupOpen, toggleEditProfilePopup] =
    React.useState(false);
  const [isEditAvatarPopupOpen, toggleEditAvatarPopup] = React.useState(false);
  const [isAddPlacePopupOpen, toggleAddPlacePopup] = React.useState(false);
  const [selectedCard, selectCard] = React.useState(null);
  const [deletedCard, deleteCard] = React.useState(null);
  const [userInfo, setUserInfo] = React.useState({});
  const [cards, updateCards] = React.useState([]);

  function loadServerData() {
    api.getAllInfo().then((data) => {
      setUserInfo({
        ...userInfo,
        name: data[0].name,
        about: data[0].about,
        avatar: data[0].avatar,
        id: data[0]._id,
      });
      updateCards(data[1]);
    });
  }

  function handleEditProfileClick() {
    toggleEditProfilePopup(true);
  }

  function handleEditAvatarClick() {
    toggleEditAvatarPopup(true);
  }

  function handleAddPlaceClick() {
    toggleAddPlacePopup(true);
  }

  function closeAllPopups() {
    toggleAddPlacePopup(false);
    toggleEditAvatarPopup(false);
    toggleEditProfilePopup(false);
    selectCard(null);
    deleteCard(null);
  }

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
    console.log(editAvatarFormInput);

    api
      .editProfilePicture(editAvatarFormInput)
      .then((userParameters) => {
        setUserInfo({ ...userInfo, avatar: userParameters.avatar });
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
        updateCards([newCard, ...cards]);
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
          updateCards(data);
        });
      })
      .catch((err) => api.reportError(err))
      .finally(() => {
        updateSaveButton(false, ".delete-popup");
        closeAllPopups();
      });
  }

  return (
    <div className="page">
      <Header />
      <Main
        onEditProfileClick={handleEditProfileClick}
        onAddPlaceClick={handleAddPlaceClick}
        onEditAvatarClick={handleEditAvatarClick}
        onCardClick={selectCard}
        onCardDelete={deleteCard}
        onMount={loadServerData}
        userData={userInfo}
        cardsList={cards}
      />
      <Footer />
      <PopupWithForm
        name="edit"
        title="Edit Profile"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onSubmit={submitEditProfileForm}
        fillForm={true}
      >
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
          className="form__input"
        />
        <span className="avatar-input-error form__input-error"></span>
      </PopupWithForm>
      <PopupWithForm
        name="add"
        title="New Place"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onSubmit={submitAddPlaceForm}
      >
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
      </PopupWithForm>
      <ImagePopup name="image" card={selectedCard} onClose={closeAllPopups} />
      <PopupWithForm
        name="delete"
        isOpen={deletedCard}
        onSubmit={submitDeleteCardForm}
        onClose={closeAllPopups}
        title="Are You Sure?"
      ></PopupWithForm>
    </div>
  );
}

export default App;
