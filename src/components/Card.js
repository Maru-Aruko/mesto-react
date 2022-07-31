import React from "react";

function Card({card, onCardClick}) {

    function handleClick() {
        onCardClick(card);
    }

    return (
        <figure className="card">
            <img className="card__img" id="cardImg" src={card.src} alt={card.alt} onClick={handleClick}/>
            <button className="card__delete-button card__delete-button_hide button" id="deleteButton"
                    type="button"></button>
            <figcaption className="card__text">
                <h3 className="card__name" id="cardName">{card.title}</h3>
                <button className="card__like-button button" type="button"></button>
            </figcaption>
            <p className="card__like-counter">{card.likes.length}</p>
        </figure>
    )
}

export default Card;
