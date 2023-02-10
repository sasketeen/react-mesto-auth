/** Компонент инфоромационного модального окна */
export default function InfoTooltip({
  name,
  onClose,
  onOverlayClick,
  isOpen,
  isSuccess,
}) {
  const message = isSuccess
    ? "Вы успешно зарегистрировались!"
    : "Что-то пошло не так!Попробуйте ещё раз";

  return (
    <div
      className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}
      onMouseDown={onOverlayClick}
    >
      <div
        className={`popup__container tooltip ${
          isSuccess ? "tooltip_type_success" : "tooltip_type_fail"
        }`}
      >
        <button
          className="button popup__closeButton"
          type="button"
          name="close"
          onClick={onClose}
        />
        <p className="tooltip__message">{message}</p>
      </div>
    </div>
  );
}
