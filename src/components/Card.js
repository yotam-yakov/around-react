import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  function handleCardClick() {
    props.onCardClick(props.card);
  }

  function handleCardDelete() {
    props.onCardDelete(props.card);
  }

  const isLiked = props.card.likes.some((like) => like._id === currentUser.id);

  function handleLikeClick() {
    isLiked
      ? props.onLikeClick(props.card._id, "DELETE")
      : props.onLikeClick(props.card._id, "PUT");
  }

  return (
    <li className="elements__list-item">
      <article className="element">
        <button
          type="button"
          className={`element__remove-button ${
            props.card.owner._id === currentUser.id
              ? "element__remove-button_owner"
              : ""
          }`}
          onClick={handleCardDelete}
        ></button>
        <img
          src={props.card.link}
          alt="user uploaded"
          className="element__image"
          onClick={handleCardClick}
        />
        <div className="element__image-caption">
          <h2 className="element__caption-text">{props.card.name}</h2>
          <div className="element__like-div">
            <button
              type="button"
              className={`element__like-button ${
                isLiked ? "element__like-button_active" : ""
              }`}
              onClick={handleLikeClick}
            ></button>
            <span className="element__like-counter">
              {props.card.likes.length}
            </span>
          </div>
        </div>
      </article>
    </li>
  );
}
