import React from "react";

export default function ImagePopup(props) {
  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickClose);
    document.addEventListener("keydown", handleKeyClose);

    return () => {
      document.removeEventListener("mousedown", handleClickClose);
      document.removeEventListener("keydown", handleKeyClose);
    };
  }, []);

  function handleClickClose(evt) {
    const popup = document.querySelector(`.${props.name}-popup`);
    if (evt.target === popup) {
      props.onClose();
    }
  }

  function handleKeyClose(evt) {
    if (evt.key === "Escape") {
      props.onClose();
    }
  }

  return (
    <div className={`image-popup popup ${props.card ? "popup_opened" : ""}`}>
      <div className="image-popup__container">
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
