import { useEffect, useContext, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import useValidation from "../../hooks/useValidation";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

/**
 * Компонент попапа редактирования профиля
 * @param {Object} props - пропсы:
 * - onUpdateUser - функция обновления данных пользователя
 * - onClose - функция обработчик клика по крестику
 * - onOverlayClick - функция обработчик клика по оверлею
 * - isOpen - флаг открытия попапа
 * - isLoading - флаг процесса отправки данных
 */
export default function EditProfilePopup({ onUpdateUser, ...props }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [onChange, errors, validity] = useValidation();

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  const handleInputName = ({ target }) => {
    setName(target.value);
  };

  const handleInputDescription = ({ target }) => {
    setDescription(target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  };

  const buttonText = props.isLoading ? "Сохранение" : "Сохранить";

  return (
    <PopupWithForm
      name="editProfile"
      title="Редактировать профиль"
      buttonText={buttonText}
      isDisabled={!validity}
      {...props}
      onSubmit={handleSubmit}
    >
      <label className="label label_hidden" htmlFor="usernameInput">
        Имя
      </label>
      <input
        type="text"
        className={`input input_place_popup ${
          errors.username ? "input_type_error" : ''
        }`}
        id="usernameInput"
        name="username"
        minLength="2"
        maxLength="40"
        required
        value={name}
        onChange={(event) => {
          handleInputName(event);
          onChange(event);
        }}
      />
      <span
        className={`input-error usernameInput-error ${
          errors.username ? "input-error_active" : ''
        }`}
      >
        {errors.username}
      </span>
      <label className="label label_hidden" htmlFor="descriptionInput">
        Описание профиля
      </label>
      <input
        type="text"
        className={`input input_place_popup ${
          errors.description ? "input_type_error" : ''
        }`}
        id="descriptionInput"
        name="description"
        minLength="2"
        maxLength="200"
        required
        value={description}
        onChange={(event) => {
          handleInputDescription(event);
          onChange(event);
        }}
      />
      <span
        className={`input-error descriptionInput-error ${
          errors.description ? "input-error_active" : ''
        }`}
      >
        {errors.description}
      </span>
    </PopupWithForm>
  );
}
