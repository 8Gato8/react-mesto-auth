import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { checkIfCardIsLiked } from "../utils/constants";

function Card({ card, onCardClick, onCardLike, onDeleteClick }) {

	const currentUser = React.useContext(CurrentUserContext);

	const isOwn = currentUser._id === card.owner._id;

	const cardLikeButtonClassName = (
		`card__like-button ${(checkIfCardIsLiked(card, currentUser) === true) && 'card__like-button_active'}`
	);

	function handleClick() {

		onCardClick(card);
	}

	function handleLikeClick() {

		onCardLike(card);
	}

	function handleDeleteClick() {

		onDeleteClick(card);
	}

	return (

		<li className="cards__card card">

			<div className="card__img-mask">

				<img
					className="card__img"
					src={card.link}
					alt={card.name}
					onClick={handleClick}
				/>
			</div>

			<h2 className="card__title title">{card.name}</h2>

			<div className="card__like-container">

				<button
					className={cardLikeButtonClassName}
					type="button"
					onClick={handleLikeClick}
				>
				</button>

				<p className="card__like-counter">{card.likes.length}</p>
			</div>

			{isOwn && <button className="card__trash-button" onClick={handleDeleteClick} />}
		</li>
	)
}

export default Card;