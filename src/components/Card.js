import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card(props) {

    const currentUser = React.useContext(CurrentUserContext)

    function handleClick() {
        props.onCardClick(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }

    const isOwn = props.card["owner"]["_id"] === currentUser["_id"];
    const cardDeleteButtonClassName = (
        `card__delete-button ${isOwn ? 'card__delete-button button' : 'card__delete-button_hide button'}`
    );

    const isLiked = props.card["likes"].some(i => i["_id"] === currentUser["_id"]);
    const cardLikeButtonClassName = (
        `card__like-button ${isLiked ? `card__like-button_active button` : `card__like-button button`}`
    );

    return (
        <figure className="card">
            <img className="card__img" id="cardImg" src={props.card.link} alt={props.card.name} onClick={handleClick}/>
            <button className={cardDeleteButtonClassName} id="deleteButton"
                    type="button" onClick={handleDeleteClick}></button>
            <figcaption className="card__text">
                <h3 className="card__name" id="cardName">{props.card.name}</h3>
                <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
            </figcaption>
            <p className="card__like-counter">{props.card["likes"].length}</p>
        </figure>
    )
}

export default Card;
