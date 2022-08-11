import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card(props) {

    const currentUser = React.useContext(CurrentUserContext)

    function handleClick() {
        props.onCardClick(props.card);
    }

    const isOwn = props.card["owner._id"] === currentUser["_id"];
    const cardDeleteButtonClassName = (
        `card__delete-button ${isOwn ? 'card__delete-button' : 'card__delete-button_hide'}`
    );

    const isLiked = props.card["likes"].some(i => i["_id"] === currentUser["_id"]);
    const cardLikeButtonClassName = `...`;



    return (
        <figure className="card">
            <img className="card__img" id="cardImg" src={props.card.link} alt={props.card.name} onClick={handleClick}/>
            <button className="card__delete-button card__delete-button_hide button" id="deleteButton"
                    type="button"></button>
            <figcaption className="card__text">
                <h3 className="card__name" id="cardName">{props.card.name}</h3>
                <button className="card__like-button button" type="button"></button>
            </figcaption>
            <p className="card__like-counter">{props.card["likes"].length}</p>
        </figure>
    )
}

export default Card;
