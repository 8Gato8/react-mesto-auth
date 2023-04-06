import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';


function Main({
	onEditAvatar,
	onEditProfile,
	onAddPlace,
	onDeleteClick,
	onCardClick,
	onCardLike,
	cards
}) {

	const currentUser = React.useContext(CurrentUserContext);

	return (

		<main className="content page__content">

			<section className="profile page__profile">

				<div className="profile__avatar-container">

					<div
						onClick={onEditAvatar}
						className="profile__avatar-mask">
					</div>

					<img
						className="profile__avatar"
						src={currentUser.avatar}
						alt="Аватар профиля"
					/>

				</div>

				<div className="profile__info">
					<h1 className="profile__name">{currentUser.name}</h1>
					<p className="profile__job">{currentUser.about}</p>

					<button
						onClick={onEditProfile}
						className="profile__edit-button"
						type="button">
					</button>
				</div>

				<button
					onClick={onAddPlace}
					className="profile__add-button"
					type="button">
				</button>

			</section>

			<section className="cards page__cards">

				<ul className="cards__list">

					{cards.map((card) => (

						<Card
							card={card}
							key={card._id}
							onCardClick={onCardClick}
							onCardLike={onCardLike}
							onDeleteClick={onDeleteClick}
						/>
					))}
				</ul>

			</section>

		</main>
	)
}


export default Main;