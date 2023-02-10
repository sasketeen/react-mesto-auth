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
      <label className="label label_hidden" htmlFor="nameInput">
        Название фотографии
      </label>
      <input
        type="text"
        className={`input input_place_popup ${
          errors.name ? "input_type_error" : ''
        }`}
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
        className={`input-error nameInput-error ${
          errors.name ? "input-error_active" : ''
        }`}
      >
        {errors.name}
      </span>
      <label className="label label_hidden" htmlFor="linkInput">
        Ссылка на фотографию
      </label>
      <input
        type="url"
        className={`input input_place_popup ${
          errors.link ? "input_type_error" : ''
        }`}
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
        className={`input-error linkInput-error ${
          errors.link ? "input-error_active" : ''
        }`}
      >
        {errors.link}
      </span>
    </PopupWithForm>
  );
}