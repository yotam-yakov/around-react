import React from "react";

export default function ImagePopup(props) {
  return (
    <div
      className={`image-popup popup ${props.card ? "popup_opened" : ""}`}
      onClick={props.onClose}
    >
      <div
        className="image-popup__container"
        onClick={(evt) => evt.stopPropagation()}
      >
        <button
          type="button"
          className="image-popup__close-button close-button"
          onClick={props.onClose}
        ></button>
        <img
          id="popup-image"
          src={`${props.card ? props.card.link : "#"}`}
          alt="enlarged user uploaded"
          className="image-popup__image"
        />
        <p id="popup-caption" className="image-popup__caption">
          {`${props.card ? props.card.name : "#"}`}
        </p>
      </div>
    </div>
  );
}
