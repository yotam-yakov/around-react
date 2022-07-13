export default function ImagePopup() {
  return (
    <div className="image-popup popup">
      <div className="image-popup__container">
        <button
          type="button"
          className="image-popup__close-button close-button"
        ></button>
        <img
          id="popup-image"
          src="#"
          alt="enlarged user uploaded"
          className="image-popup__image"
        />
        <p id="popup-caption" className="image-popup__caption">
          caption
        </p>
      </div>
    </div>
  );
}
