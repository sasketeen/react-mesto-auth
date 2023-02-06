import { useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

import api from "../utils/Api";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import ImagePopup from "./ImagePopup/ImagePopup";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup";

import defaultAvatar from "../images/Anonymous_emblem.svg";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup";
import ConfirmPopup from "./ConfirmPopup/ConfirmPopup";

function App() {
  //стейты
  const [currentUser, setCurrentUser] = useState({
    name: "Anonimus",
    about: "Anonimus descriprion",
    avatar: defaultAvatar,
  });

  const [cards, setCards] = useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditProfileLoading, setIsEditProfileLoading] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isAddPlaceLoading, setIsAddPlaceLoading] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditAvatarLoading, setIsEditAvatarLoading] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isConfirmLoading, setIsConfirmLoading] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [deletingCard, setDeletingCard] = useState({});

  //инициализация начальных данных при монтировании
  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch((err) => console.log(err));
  }, []);

  /**
   *  функция обновления данных пользователя после запроса
   * @param {object} userData - объект пользователя
   */
  const updateUserInfo = (userData) => {
    setCurrentUser(userData);
    closeAllPopups();
  };

  /**
   * функция обработчик клика по кнопке редактирования профиля
   */
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  /**
   * функция обработки сабмита формы обновления информации пользователя
   * @param {object} newUserData - объект с новым именем и описание пользователя
   */
  const handleUpdateUser = (newUserData) => {
    setIsEditProfileLoading(true);
    api
      .editUserInfo(newUserData)
      .then((userData) => {
        updateUserInfo(userData);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsEditProfileLoading(false));
  };

  /**
   * функция обработчик клика по кнопке добавления карточки
   */
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  /**
   * функция обработки сабмита формы добавления карточки
   * @param {object} cardData - объект с новым данными карточки
   */
  const handleAddPlace = (cardData) => {
    setIsAddPlaceLoading(true);
    api
      .addCard(cardData)
      .then((newCard) => {
        closeAllPopups();
        setCards([newCard, ...cards]);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsAddPlaceLoading(false));
  };

  /**
   * функция обработчик клика по кнопке редактирования аватара
   */
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  /**
   * функция обработки сабмита формы обновления аватара
   * @param {object} newAvatarData - объект с новой ссылкой на аватар
   */
  const handleUpdateAvatar = (newAvatarData) => {
    setIsEditAvatarLoading(true);
    api
      .editAvatar(newAvatarData)
      .then((userData) => {
        updateUserInfo(userData);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsEditAvatarLoading(false));
  };

  /**
   * функция обработчик клика по фото
   * @param {object} card - объект выбранной карточки
   */
  const handleClickImage = (card) => {
    setSelectedCard(card);
  };

  /**
   * функция обработчик лайка карточки
   * @param {object} targetCard - объект лайкнутой карточки
   */
  const handleLikeCard = (targetCard) => {
    const isLiked = targetCard.likes.some(
      (user) => user._id === currentUser._id
    );

    api
      .changeLike(targetCard._id, isLiked)
      .then((newCard) =>
        setCards((cards) =>
          cards.map((card) => (card._id === targetCard._id ? newCard : card))
        )
      )
      .catch((err) => console.log(err));
  };

  /**
   * функция обработчик клика по кнопке удаления
   * @param {object} targetCard - объект удаляемой карточки
   */
  const handleClickDeleteCard = (targetCard) => {
    setDeletingCard(targetCard);
    setIsConfirmPopupOpen(true);
  };

  /**
   * функция обработчик удаления карточки
   * @param {event} event - событие сабмита
   */
  const handleConfirmDelete = (event) => {
    event.preventDefault();
    setIsConfirmLoading(true);
    api
      .deleteCard(deletingCard._id)
      .then(() => {
        setCards((cards) =>
          cards.filter((card) => {
            return card._id !== deletingCard._id;
          })
        );
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsConfirmLoading(false));
  };

  //обработчики закрытия попапов

  /**
   * функция закрытия попапов
   */
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmPopupOpen(false);
    setSelectedCard({});
    setDeletingCard({});
  };

  /**
   * функция обработчик клика по оверлею
   */
  const handleOverlayClick = ({ target, currentTarget }) => {
    if (target === currentTarget) closeAllPopups();
  };

  /**
   * функция обработчик нажатия на esc
   */

  useEffect(() => {
    if (
      isEditProfilePopupOpen ||
      isAddPlacePopupOpen ||
      isConfirmPopupOpen ||
      isEditAvatarPopupOpen ||
      selectedCard._id
    ) {
      const handleEscPress = ({ key }) => {
        if (key === "Escape") {
          closeAllPopups();
        }
      };

      document.addEventListener("keydown", handleEscPress);

      return () => {
        document.removeEventListener("keydown", handleEscPress);
      };
    }
  }, [
    isEditProfilePopupOpen,
    isAddPlacePopupOpen,
    isConfirmPopupOpen,
    isEditAvatarPopupOpen,
    selectedCard._id,
  ]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          cards={cards}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onClickImage={handleClickImage}
          onClickLike={handleLikeCard}
          onClickDelete={handleClickDeleteCard}
        />
        <Footer />

        <EditAvatarPopup
          onClose={closeAllPopups}
          onOverlayClick={handleOverlayClick}
          onUpdateAvatar={handleUpdateAvatar}
          isOpen={isEditAvatarPopupOpen}
          isLoading={isEditAvatarLoading}
        />

        <EditProfilePopup
          onClose={closeAllPopups}
          onOverlayClick={handleOverlayClick}
          onUpdateUser={handleUpdateUser}
          isOpen={isEditProfilePopupOpen}
          isLoading={isEditProfileLoading}
        />

        <AddPlacePopup
          onClose={closeAllPopups}
          onOverlayClick={handleOverlayClick}
          onAddPlace={handleAddPlace}
          isOpen={isAddPlacePopupOpen}
          isLoading={isAddPlaceLoading}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          onOverlayClick={handleOverlayClick}
        />

        <ConfirmPopup
          onClose={closeAllPopups}
          onOverlayClick={handleOverlayClick}
          onSubmit={handleConfirmDelete}
          isOpen={isConfirmPopupOpen}
          isLoading={isConfirmLoading}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
