/**
 * Компонент попапа с формой
 * @param {object} props - пропсы
 * - name - значение модификатора формы
 * - title - заголовок формы
 * - buttonText - текст кнопки
 * - validity - флаг валидности формы
 * - isOpen - флаг открытия попапа
 * - isLoading - флаг процесса отправки данных
 * - onClose - функция обработчик клика по крестику
 * - onOverlayClick - функция обработчик клика по оверлею
 * - onSubmit - функция обработчик сабмита
 * - children - внутренняя разметка формы
 */

export default function PopupWithForm({
  name,
  title,
  buttonText,
  isDisabled,
  isOpen,
  isLoading,
  onClose,
  onOverlayClick,
  onSubmit,
  children,
}) {
  return (
    <div
      className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}
      onMouseDown={onOverlayClick}
    >
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <button
          className="button popup__closeButton"
          type="button"
          name="close"
          onClick={onClose}
        />
        <form
          method="post"
          className="popup__form"
          name={`${name}-form`}
          noValidate
          onSubmit={onSubmit}
        >
          {children}
          <button
            type="submit"
            className={`button popup__saveButton
            ${(isLoading || isDisabled) && "popup_saveButton_disabled"}`}
            disabled={isLoading || isDisabled}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
