import React from "react";

function ImagePopup({card, onClose, handleOverlayClose}) {
    return (
        <div className={`popup popup_img-bg ${card.link && "popup_opened"}`} onClick={handleOverlayClose}>
            <div className="popup__container popup__container_img" id="popupCardImg">
                <button className="popup__close-button button" id="closeButtonImg" type="button" onClick={onClose}></button>
                <img className="popup__img" src={card.link} alt={card.name}/>
                <p className="popup__text">{card.name}</p>
            </div>
        </div>
    )
}

export default ImagePopup;