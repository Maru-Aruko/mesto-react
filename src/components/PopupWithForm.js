import React from "react";

function PopupWithForm({title, name, text, children, isOpen, onClose, onSubmit}) {
    return (
        <div className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}>
            <div className="popup__container">
                <button className="popup__close-button button" type="button" onClick={onClose}/>
                <h2 className="popup__title">{title}</h2>
                <form className={`popup__form popup__form_type_${name}`} name={`popup_form_${name}`} onSubmit={onSubmit} noValidate>
                    {children}
                    <button className="popup__save-button button"
                            type="submit">{text}</button>
                </form>
            </div>
        </div>

    )
}

export default PopupWithForm;