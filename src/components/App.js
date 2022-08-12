import React from 'react';
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import {api} from "../utils/api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";


function App() {

    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);

    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);

    const [selectedCard, setSelectedCard] = React.useState({});

    function handleEditProfileClick() {
        setEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setAddPlacePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setEditAvatarPopupOpen(true);
    }

    function handleCardClick(img) {
        setSelectedCard(img);
    }

    function handleOverlayClose(evt) {
        const evtTarget = evt.target;
        if (evtTarget.classList.contains('popup')) {
            closeAllPopups();
        }
    }

    function closeAllPopups() {
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setEditAvatarPopupOpen(false);
        setSelectedCard({});
    }

    React.useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([me,cards]) => {
                setCurrentUser(me);
                setCards(cards);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card["likes"].some(i => i["_id"] === currentUser["_id"]);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card["_id"], !isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c["_id"] === card["_id"] ? newCard : c));
        });
    }

    function handleCardDelete(card) {
        api.removeCard(card["_id"]).then(() => {
            setCards((items) => items.filter((c) => c["_id"] !== card["_id"] && c));
        }).catch((err) => {
            console.error(err);
        });
    }

    function handleUpdateUser(data) {
        api.setProfile(data)
            .then((dataUser) => {
                setCurrentUser(dataUser);
                closeAllPopups();
            })
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">

                <Header/>

                <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick}
                      onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} cards={cards}
                      onCardLike={handleCardLike} onCardDelete={handleCardDelete}/>

                <Footer/>

                <ImagePopup card={selectedCard} onClose={closeAllPopups}
                            handleOverlayClose={handleOverlayClose}></ImagePopup>

                <PopupWithForm title="Новое место" name="place" text="Создать" isOpen={isAddPlacePopupOpen}
                               onClose={closeAllPopups}>
                    <label className="popup__field">
                        <input className="popup__input" id="placeNameInput" name="place-name"
                               placeholder="Название"
                               defaultValue=""
                               required></input>
                        <span className="popup__input-error placeNameInputError" id="placeInputError"></span>
                    </label>
                    <label className="popup__field">
                        <input className="popup__input" id="placeLinkInput" name="place-link" type="url"
                               placeholder="Ссылка на картинку" defaultValue="" required></input>
                        <span className="popup__input-error placeLinkInputError" id="linkInputError"></span>
                    </label>
                </PopupWithForm>

                <PopupWithForm title="Обновить аватар" name="avatar" text="Сохранить"
                               isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
                    <label className="popup__field">
                        <input className="popup__input" id="avatarEditInput" name="avatar" type="url"
                               placeholder="Ссылка на аватар" defaultValue="" required></input>
                        <span className="popup__input-error avatarEditInputError"></span>
                    </label>
                </PopupWithForm>

                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

                <div className="popup" id="popupConfirm">
                    <div className="popup__container" id="formConfirm">
                        <button className="popup__close-button button" id="closeButtonConfirm" type="button"></button>
                        <form className="popup__form" name="popup__form" noValidate>
                            <h2 className="popup__confirm-title">Вы уверены?</h2>
                            <button className="popup__confirm-button button button_submit" type="submit">Да</button>
                        </form>
                    </div>
                </div>
                <div className="popup" id="popupEditAvatar">
                    <div className="popup__container" id="formEditAvatar">
                        <button className="popup__close-button button" id="closeButtonEditAvatar"
                                type="button"></button>
                        <form className="popup__form" name="popup__form" noValidate>
                            <h2 className="popup__title">Обновить аватар</h2>
                            <label className="popup__field">
                                <input className="popup__input" id="avatarEditInput" name="avatar" type="url"
                                       placeholder="Ссылка на аватар" defaultValue="" required></input>
                                <span className="popup__input-error avatarEditInputError"></span>
                            </label>
                            <button className="popup__edit-button button button_submit button_inactive"
                                    type="submit">Сохранить
                            </button>
                        </form>
                    </div>
                </div>

            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
