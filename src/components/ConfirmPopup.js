import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmPopup({card, isOpen, onClose, onConfirm}) {

    function handleSubmit(e) {
        e.preventDefault();
        onConfirm(card);
    }

    return (
        <PopupWithForm
                       title="Вы уверены?"
                       name="confirm"
                       text="Да"
                       isOpen={isOpen}
                       onClose={onClose}
                       onSubmit={handleSubmit}
                       id="popupConfirm">
        </PopupWithForm>
    )
}

export default ConfirmPopup;


