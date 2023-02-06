/**
 * Компонент попапа с фото
 * @param {object} props - пропсы:
 * - card - объект карточки, на которую кликнули
 * - onClose - функция обработчик клика по крестику
 * - onOverlayClick - функция обработчик клика по оверлею
 */
export default function ImagePopup({ card, onClose, onOverlayClick }) {
  return (
    <div
      className={`popup popup_type_image ${card.name ? "popup_opened" : ""}`}
      onClick={onOverlayClick}
    >
      <div className="popup__image-container">
        <button
          className="button popup__closeButton"
          type="button"
          name="close"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
        <figure className="popup__figure">
          <img src={card.link} alt={card.name} className="popup__image" />
          <figcaption className="popup__subtitle">{card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}
