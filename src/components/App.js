import React from 'react';
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
//import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import {api} from "../utils/api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmPopup from "./ConfirmPopup";


function App() {

    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
    const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
    const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);

    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);

    const [selectedCard, setSelectedCard] = React.useState({});

    //const [isLoading, setIsLoading] = React.useState(false);

    function handleEditProfileClick() {
        setEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setAddPlacePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setEditAvatarPopupOpen(true);
    }

    function handleConfirmClick(card){
        setIsConfirmPopupOpen(true);
        setSelectedCard(card)
    }

    function handleCardClick(img) {
        setImagePopupOpen(true);
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
        setIsConfirmPopupOpen(false);
        setImagePopupOpen(false);
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
            closeAllPopups();
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

    const handleUpdateAvatar = (newAvatar) => {
        api.changeAvatar(newAvatar)
            .then((data) => {
                setCurrentUser(data)
                closeAllPopups()
            })
            .catch(err => console.log(err));
    }

    function handleAddPlaceSubmit(data) {
        api.addNewCard(data)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch(err => console.log(err));
    }


    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">

                <Header/>

                <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick}
                      onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} cards={cards}
                      onCardLike={handleCardLike} onCardDelete={handleConfirmClick} />

                <Footer/>

                <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups} handleOverlayClose={handleOverlayClose}></ImagePopup>

                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

                <ConfirmPopup card={selectedCard} isOpen={isConfirmPopupOpen} onClose={closeAllPopups} onConfirm={handleCardDelete} />

            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
