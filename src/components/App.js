import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddCardPopup from "./AddCardPopup";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "./utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import CardsContext from "../contexts/CardsContext";
import "../index.css";

function App() {
  //STATE VARIABLES
  //Popups toggles
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = React.useState(false);
  //Card selectors
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [deletedCard, setDeletedCard] = React.useState(null);
  //Server data
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});
  //Inputs states

  //Edit form states
  const [profileName, setProfileName] = React.useState("");
  const [profileAbout, setProfileAbout] = React.useState("");
  //Avatar form state
  //Add form states
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
    setIsAddCardPopupOpen(true);
  }

  //Popup closing handler
  function closeAllPopups() {
    setIsAddCardPopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setSelectedCard(null);
    setDeletedCard(null);
  }

  //Popup submit handlers
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

  function checkIfFormValid(name, inputs) {
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
      <CardsContext.Provider value={cards}>
        <div className="page">
          {/* Main page content */}
          <Header />
          <Main
            onEditProfileClick={handleEditProfileClick}
            onAddPlaceClick={handleAddPlaceClick}
            onEditAvatarClick={handleEditAvatarClick}
            onCardClick={setSelectedCard}
            onCardDelete={setDeletedCard}
            updateCards={setCards}
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
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            updateUser={setCurrentUser}
            updateCards={setCards}
          />
          <AddCardPopup
            isOpen={isAddCardPopupOpen}
            onClose={closeAllPopups}
            updateCards={setCards}
            checkValidity={checkIfFormValid}
            formValidity={isAddFormValid}
            setFormValidity={setIsAddFormValid}
          />
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
          <ImagePopup
            name="image"
            card={selectedCard}
            onClose={closeAllPopups}
          />
        </div>
      </CardsContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
