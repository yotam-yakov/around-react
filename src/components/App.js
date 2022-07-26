import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "./utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";
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
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});
  //Inputs states

  const [formTitleInput, setFormTitleInput] = React.useState({});
  const [formLinkInput, setFormLinkInput] = React.useState({});
  const [formAvatarInput, setFormAvatarInput] = React.useState({});
  //Edit form states
  const [profileName, setProfileName] = React.useState("");
  const [profileAbout, setProfileAbout] = React.useState("");
  //Avatar form state
  const [avatarLink, setAvatarLink] = React.useState("");
  //Add form states
  const [cardTitle, setCardTitle] = React.useState("");
  const [cardLink, setCardLink] = React.useState("");
  //Loading state
  const [isLoading, setIsLoading] = React.useState(false);
  const [isAddFormValid, setIsAddFormValid] = React.useState(false);
  const [isEditFormValid, setIsEditFormValid] = React.useState(true);

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
    setFormAvatarInput({});
    setFormTitleInput({});
    setFormLinkInput({});

    setAvatarLink("");
    setCardTitle("");
    setCardLink("");
  }
  //Popup submit handlers
  function submitEditAvatarForm(evt) {
    evt.preventDefault();
    setIsLoading(true);

    api
      .editProfilePicture(formAvatarInput.input.value)
      .then((userInfo) => {
        setCurrentUser({ ...currentUser, avatar: userInfo.avatar });
        setProfileName(userInfo.name);
        setProfileAbout(userInfo.about);
      })
      .catch((err) => api.reportError(err))
      .finally(() => {
        setIsLoading(false);
        closeAllPopups();
      });
  }

  function submitAddPlaceForm(evt) {
    evt.preventDefault();
    setIsLoading(true);

    api
      .addNewCard({ title: cardTitle, link: cardLink })
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .catch((err) => api.reportError(err))
      .finally(() => {
        setIsLoading(false);
        closeAllPopups();
      });
  }

  function submitDeleteCardForm(evt) {
    evt.preventDefault();
    setIsLoading(true);

    api
      .deleteCard(deletedCard._id)
      .then(() => {
        api.loadCards().then(() => {
          setCards(cards.filter((card) => card._id !== deletedCard._id));
        });
      })
      .catch((err) => api.reportError(err))
      .finally(() => {
        setIsLoading(false);
        closeAllPopups();
      });
  }

  //Other functions
  function updateInputs(evt) {
    const inputProps = {
      input: evt.target,
      valid: evt.target.validity.valid,
      error: evt.target.validationMessage,
    };
    switch (evt.target.id) {
      // case "name-input":
      //   setFormNameInput({
      //     ...formNameInput,
      //     input: inputProps.input,
      //     valid: inputProps.valid,
      //     error: inputProps.error,
      //   });
      //   setProfileName(inputProps.input.value);
      //   checkIfFormValid("edit");
      //   break;
      // case "about-input":
      //   setFormAboutInput({
      //     ...formAboutInput,
      //     input: inputProps.input,
      //     valid: inputProps.valid,
      //     error: inputProps.error,
      //   });
      //   setProfileAbout(inputProps.input.value);
      //   checkIfFormValid("edit");
      //   break;
      case "title-input":
        setFormTitleInput({
          ...formTitleInput,
          input: inputProps.input,
          valid: inputProps.valid,
          error: inputProps.error,
        });
        setCardTitle(inputProps.input.value);
        checkIfFormValid("add");
        break;
      case "link-input":
        setFormLinkInput({
          ...formLinkInput,
          input: inputProps.input,
          valid: inputProps.valid,
          error: inputProps.error,
        });
        setCardLink(inputProps.input.value);
        checkIfFormValid("add");
        break;
      case "avatar-input":
        setFormAvatarInput({
          ...formAvatarInput,
          input: inputProps.input,
          valid: inputProps.valid,
          error: inputProps.error,
        });
        setAvatarLink(inputProps.input.value);
        break;
    }
  }

  function checkIfFormValid(name, inputs) {
    if (!inputs) {
      inputs = [formTitleInput, formLinkInput];
    }
    for (let i = 0; i < inputs.length; i++) {
      if (!inputs[i].valid) {
        switch (name) {
          case "edit":
            setIsEditFormValid(false);
            break;
          case "add":
            setIsAddFormValid(false);
            break;
        }
        return;
      }
    }
    switch (name) {
      case "edit":
        setIsEditFormValid(true);
        break;
      case "add":
        setIsAddFormValid(true);
        break;
    }
  }

  React.useEffect(() => {
    api
      .getAllInfo()
      .then(([userInfo, cards]) => {
        setCurrentUser({
          ...currentUser,
          name: userInfo.name,
          about: userInfo.about,
          avatar: userInfo.avatar,
          id: userInfo._id,
        });
        setProfileName(userInfo.name);
        setProfileAbout(userInfo.about);
        setCards(cards);
      })
      .catch((err) => api.reportError(err));
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        {/* Main page content */}
        <Header />
        <Main
          onEditProfileClick={handleEditProfileClick}
          onAddPlaceClick={handleAddPlaceClick}
          onEditAvatarClick={handleEditAvatarClick}
          onCardClick={setSelectedCard}
          onCardDelete={setDeletedCard}
          setCards={setCards}
          cardsList={cards}
        />
        <Footer />

        {/* Popups */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          updateUser={setCurrentUser}
          checkValidity={checkIfFormValid}
          formValidity={isEditFormValid}
          setFormValidity={setIsEditFormValid}
        />
        <PopupWithForm
          name="avatar"
          title="Change Profile Picture"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onSubmit={submitEditAvatarForm}
        >
          <input
            value={avatarLink || ""}
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
            disabled={!formAvatarInput.valid}
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </PopupWithForm>
        <PopupWithForm
          name="add"
          title="New Place"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onSubmit={submitAddPlaceForm}
          formValidator={checkIfFormValid}
          formInputs={[formTitleInput, formLinkInput]}
          formIsValid={false}
          validateForm={setIsAddFormValid}
        >
          <input
            value={cardTitle || ""}
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
            value={cardLink || ""}
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
              isAddFormValid ? "" : "form__save_disabled"
            }`}
            disabled={!isAddFormValid}
          >
            {isLoading ? "Saving..." : "Save"}
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
          >
            {isLoading ? "Deleting..." : "Yes"}
          </button>
        </PopupWithForm>
        <ImagePopup name="image" card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
