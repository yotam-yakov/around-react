import React from "react";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";
import CardsContext from "../contexts/CardsContext";

export default function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const cards = React.useContext(CardsContext);

  function handleLikeClick(cardId, method) {
    props
      .likeRequest(cardId, method)
      .then((newCard) => {
        props.updateCards((state) =>
          state.map((card) => (card._id === newCard._id ? newCard : card))
        );
      })
      .catch((err) => props.requestError(err));
  }

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-cover">
          <img
            src={currentUser.avatar}
            alt="profile avatar of the current user"
            className="profile__avatar"
            id="profile-avatar"
          />
          <button
            type="button"
            className="profile__avatar-edit"
            onClick={props.onEditAvatarClick}
          ></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">
            <span id="profile-name" className="profile__name-text">
              {currentUser.name}
            </span>
            <button
              type="button"
              className="profile__edit-button"
              onClick={props.onEditProfileClick}
            ></button>
          </h1>
          <p id="profile-about" className="profile__about">
            {currentUser.about}
          </p>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={props.onAddPlaceClick}
        ></button>
      </section>
      <section className="elements">
        <ul className="elements__list">
          {cards &&
            cards.map((card) => {
              return (
                <Card
                  key={card._id}
                  card={card}
                  onCardClick={props.onCardClick}
                  onCardDelete={props.onCardDelete}
                  onLikeClick={handleLikeClick}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}
