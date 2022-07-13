export default function PopupWithForm(props) {
  return (
    <div
      className={`${props.name}-popup popup ${props.isOpen && "popup_opened"}`}
    >
      <div className={`${props.name}-popup__container popup__container`}>
        <button
          type="button"
          className={`${props.name}-popup__close-button popup__close-button close-button`}
          onClick={props.onClose}
        ></button>
        <h2 className={`${props.name}-popup__title popup__title`}>
          {props.title}
        </h2>
        <form
          className={`form ${props.name}-popup__form`}
          id={`${props.name}-popup__form`}
          noValidate
        >
          {props.children}
        </form>
      </div>
    </div>
  );
}
