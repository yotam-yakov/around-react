import React from "react";
import api from "../utils/api";
import Card from "./Card";

export default function Main(props) {
  const [userName, setUserName] = React.useState("");
  const [userAbout, setUserAbout] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, updateCards] = React.useState([]);

  React.useEffect(() => {
    api.getAllInfo().then((data) => {
      console.log(data);
      setUserName(data[0].name);
      setUserAbout(data[0].about);
      setUserAvatar(data[0].avatar);
      updateCards(data[1]);
    });
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-cover">
          <img
            src={userAvatar}
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
              {userName}
            </span>
            <button
              type="button"
              className="profile__edit-button"
              onClick={props.onEditProfileClick}
            ></button>
          </h1>
          <p id="profile-about" className="profile__about">
            {userAbout}
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
          {cards.map((card) => {
            return <Card key={card._id} card={card} />;
          })}
        </ul>
      </section>
    </main>
  );
}
