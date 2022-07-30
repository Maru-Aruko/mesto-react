import React from "react";

function ImagePopup({card, onClose}) {
    return (
        <div className={`popup popup_img-bg ${card.src && "popup_opened"}`} onClick={onClose}>
            <div className="popup__container popup__container_img" id="popupCardImg">
                <button className="popup__close-button button" id="closeButtonImg" type="button"></button>
                <img className="popup__img" src={card.src} alt={card.alt}></img>
                <p className="popup__text">{card.title}</p>
            </div>
        </div>
    )
}

export default ImagePopup;