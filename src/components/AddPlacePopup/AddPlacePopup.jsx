import { useState } from "react";
import useValidation from "../../hooks/useValidation";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

/**
 *
 * @param {object} props - пропсы:
 * - onAddPlace - функция добавления карточки
 * - onClose - функция обработчик клика по крестику
 * - onOverlayClick - функция обработчик клика по оверлею
 * - isOpen - флаг открытия попапа
 * - isLoading - флаг процесса отправки данных
 */
export default function AddPlacePopup({ onAddPlace, ...props }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [onChange, errors, validity] = useValidation();
  const buttonText = props.isLoading ? "Сохранение" : "Сохранить";

  const handleInputName = ({ target }) => {
    setName(target.value);
  };
  const handleInputLink = ({ target }) => {
    setLink(target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddPlace({ name, link });
  };

  return (
    <PopupWithForm
      name="addCard"
      title="Новое место"
      buttonText={buttonText}
      isDisabled={!validity}
      {...props}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className={`popup__input ${errors.name && "popup__input_type_error"}`}
        id="nameInput"
        name="name"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
        value={name}
        onChange={(event) => {
          handleInputName(event);
          onChange(event);
        }}
      />
      <span
        className={`popup__error nameInput-error ${
          errors.name && "popup__error_active"
        }`}
      >
        {errors.name}
      </span>
      <input
        type="url"
        className={`popup__input ${errors.link && "popup__input_type_error"}`}
        id="linkInput"
        name="link"
        placeholder="Ссылка на картинку"
        required
        value={link}
        onChange={(event) => {
          handleInputLink(event);
          onChange(event);
        }}
      />
      <span
        className={`popup__error linkInput-error ${
          errors.link && "popup__error_active"
        }`}
      >
        {errors.link}
      </span>
    </PopupWithForm>
  );
}
