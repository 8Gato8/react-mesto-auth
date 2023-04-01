function ImagePopup({
	isOpen,
	onClose,
	card,
}) {

	return (

		<div className={`popup popup_type_card-review ${isOpen ? 'popup_opened' : ''}`}>

			<div className="card-review">

				<img
					className="card-review__img"
					src={card.link}
					alt={card.title}
				/>

				<h2 className="card-review__title">{card.name}</h2>

				<button

					onClick={onClose}
					className="card-review__close-button close-button"
					type="button">
				</button>

			</div>

		</div>
	);
}

export default ImagePopup;