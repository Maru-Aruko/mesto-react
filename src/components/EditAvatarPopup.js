import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({isOpen,onClose, onUpdateAvatar}) {

    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    return (
        <PopupWithForm title="Обновить аватар"
                       name="edit"
                       text="Сохранить"
                       isOpen={isOpen}
                       onClose={onClose}
                       onSubmit={handleSubmit}>
            <label className="popup__field">
                <input ref={avatarRef}
                       className="popup__input"
                       id="avatarEditInput"
                       name="avatar"
                       type="url"
                       placeholder="Ссылка на аватар"
                       defaultValue=""
                       required></input>
                <span className="popup__input-error avatarEditInputError"></span>
            </label>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;