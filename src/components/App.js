import React from 'react';
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";


function App() {

    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);

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

    function closeAllPopups() {
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setEditAvatarPopupOpen(false);
        setSelectedCard({});
    }

    return (
        <div className="body">
            <div className="page">

                <Header/>

                <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick}
                      onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick}/>

                <Footer/>

                <ImagePopup card={selectedCard} onClose={closeAllPopups}></ImagePopup>

                <PopupWithForm title={"Редактировать профиль"} name={"profile"} text={"Сохранить"}
                               isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
                    <label className="popup__field">
                        <input className="popup__input" id="nameInput" name="name-input" placeholder="Ваше имя"
                                defaultValue="Жак-Ив Кусто"
                               minLength="2" maxLength="40" required></input>
                        <span className="popup__input-error nameInputError" id="nameInputError"></span>
                    </label>
                    <label className="popup__field">
                        <input className="popup__input" id="jobInput" name="job-input" placeholder="О себе"
                               defaultValue="Исследователь океана"
                               minLength="2" maxLength="200" required></input>
                        <span className="popup__input-error jobInputError" id="jobInputError"></span>
                    </label>
                </PopupWithForm>

                <PopupWithForm title={"Новое место"} name={"place"} text={"Создать"} isOpen={isAddPlacePopupOpen}
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

                <PopupWithForm title={"Обновить аватар"} name={"avatar"} text={"Сохранить"}
                               isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
                    <label className="popup__field">
                        <input className="popup__input" id="avatarEditInput" name="avatar" type="url"
                               placeholder="Ссылка на аватар" defaultValue="" required></input>
                        <span className="popup__input-error avatarEditInputError"></span>
                    </label>
                </PopupWithForm>


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
        </div>
    );
}

export default App;
