import { useRef } from "react";
import useValidation from "../../hooks/useValidation";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

/**
 * Компонент попапа редактирования аватара
 * @param {object} props - пропсы:
 * - onUpdateAvatar - функция обновления аватара
 * - onClose - функция обработчик клика по крестику
 * - onOverlayClick - функция обработчик клика по оверлею
 * - isOpen - флаг открытия попапа
 * - isLoading - флаг процесса отправки данных
 */
export default function EditAvatarPopup({ onUpdateAvatar, ...props }) {
  const urlInputRef = useRef();
  const [onChange, errors, validity] = useValidation();

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdateAvatar({
      avatar: urlInputRef.current.value,
    });
  };
  const buttonText = props.isLoading ? "Сохранение" : "Сохранить";

  return (
    <PopupWithForm
      name="editAvatar"
      title="Обновить аватар"
      buttonText={buttonText}
      isDisabled={!validity}
      {...props}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        className={`popup__input ${errors.avatar && "popup__input_type_error"}`}
        id="avatarInput"
        name="avatar"
        placeholder="Ссылка на аватар"
        required
        ref={urlInputRef}
        onChange={onChange}
      />
      <span
        className={`popup__error avatarInput-error ${
          errors.avatar && "popup__error_active"
        }`}
      >
        {errors.avatar}
      </span>
    </PopupWithForm>
  );
}
