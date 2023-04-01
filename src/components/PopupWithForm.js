function PopupWithForm({
	isOpen,
	onClose,
	onSubmit,
	title,
	name,
	buttonText,
	children
}) {

	return (

		<div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>

			<div className="popup__container">

				<form
					id={`${name}-form`}
					className="popup__form form"
					onSubmit={onSubmit}
					name={`${name}-form`}
					noValidate
				>

					<h2 className="form__title title">{title}</h2>

					{children}

					<button
						className="form__submit-button"
						type="submit">{buttonText}
					</button>

					<button
						onClick={onClose}
						className="form__close-button close-button"
						type="button">
					</button>
				</form>

			</div>

		</div>
	)
}

export default PopupWithForm;