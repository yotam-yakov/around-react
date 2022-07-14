import React from "react";
import api from "../utils/api";

export default function Main(props) {
  const [userName, setUserName] = React.useState("");
  const [userAbout, setUserAbout] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");

  api.getUserInfo().then((data) => {
    setUserName(data.name);
    setUserAbout(data.about);
    setUserAvatar(data.avatar);
  });

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
        <ul className="elements__list"></ul>
      </section>
    </main>
  );
}
