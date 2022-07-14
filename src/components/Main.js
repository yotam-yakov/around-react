import React from "react";
import Card from "./Card";

export default function Main(props) {
  React.useEffect(() => {
    props.onMount();
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-cover">
          <img
            src={props.userData.avatar}
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
              {props.userData.name}
            </span>
            <button
              type="button"
              className="profile__edit-button"
              onClick={props.onEditProfileClick}
            ></button>
          </h1>
          <p id="profile-about" className="profile__about">
            {props.userData.about}
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
          {props.cardsList &&
            props.cardsList.map((card) => {
              return (
                <Card
                  key={card._id}
                  userId={props.userData.id}
                  card={card}
                  onCardClick={props.onCardClick}
                  onCardDelete={props.onCardDelete}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}
