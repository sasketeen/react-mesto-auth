import { useState } from "react";
/**
 * хук валидации
 * @returns {array} массив, содержащий обработчик ввода onChange,
 * объект ошибок полей errors, у которого ключами являются name полей ввода,
 * флаг валидности формы validity
 */
export default function useValidation() {
  const [errors, setErrors] = useState({});
  const [validity, setValidity] = useState(false);

  const onChange = ({ target }) => {
    const { name } = target;
    setErrors({ ...errors, [name]: target.validationMessage });
    setValidity(target.closest(".popup__form").checkValidity());
  };

  return [onChange, errors, validity];
}
