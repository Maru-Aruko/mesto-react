import React from "react";
import {api} from "../utils/api";
import Card from "./Card";

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) {

    const [userName, setUserName] = React.useState("");
    const [userDescription, setUserDescription] = React.useState("");
    const [userAvatar, setUserAvatar] = React.useState("");
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([me, card]) => {
                setUserName(me.name);
                setUserAvatar(me.avatar);
                setUserDescription(me.about);

                setCards(card.map(item => ({
                        likes: item.likes,
                        src: item.link,
                        id: item["_id"],
                        title: item.name,
                        alt: item.name
                    }
                )));
            })
            .catch((err) => {
                console.log(err)
            })
    }, []);

    return (
        <main className="page__content">
            <section className="profile">
                <div className="profile__avatar">
                    {userAvatar && (<img className="profile__avatar-img" src={userAvatar}
                         alt="Аватар профиля"/>)}
                    <div className="profile__avatar-overlay" onClick={onEditAvatar}></div>
                </div>
                <div className="profile__info">
                    <h1 className="profile__name" id="name">{userName}</h1>
                    <button className="profile__edit-button button" onClick={onEditProfile} type="button"
                            id="editButton"></button>
                    <p className="profile__job" id="job">{userDescription}</p>
                </div>
                <button className="profile__add-button button" onClick={onAddPlace} id="addButton"
                        type="button"></button>
            </section>
            <section className="cards">
                {cards.map((item) => <Card card={item} key={item["id"]} onCardClick={onCardClick}></Card>)}
            </section>
        </main>
    )
}

export default Main;