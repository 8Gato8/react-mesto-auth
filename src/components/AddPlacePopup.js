import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({
	isOpen: isAddPlacePopupOpen,
	onClose: closeAllPopups,
	onAddPlace,
	buttonText
}) {

	const [name, setName] = React.useState('');
	const [link, setLink] = React.useState('');

	function handleNameChange(e) {

		setName(e.target.value);
	}

	function handleLinkChange(e) {

		setLink(e.target.value);
	}

	function handleSubmit(e) {

		e.preventDefault();

		onAddPlace({
			name,
			link
		});
	}

	React.useEffect(() => {

		setName('');
		setLink('');
	}, [isAddPlacePopupOpen]);

	return (

		<PopupWithForm
			isOpen={isAddPlacePopupOpen}
			onClose={closeAllPopups}
			onSubmit={handleSubmit}
			title="Новое место"
			name="add-place"
			buttonText={buttonText}
		>

			<fieldset className="form__fieldset">

				<label className="form__field">

					<input
						id="input-place-name"
						className="form__input"
						value={name}
						ref={nameInput}
						placeholder="Название"
						type="text"
						name="name"
						required
						minLength="2"
						maxLength="30"
						onChange={handleNameChange}
					/>
					<span className="input-place-name-error form__input-error"></span>

				</label>

				<label className="form__field">

					<input
						id="input-place-link"
						className="form__input"
						value={link}
						ref={linkInput}
						placeholder="Ссылка на картинку"
						type="url"
						name="link"
						required
						onChange={handleLinkChange}
					/>
					<span className="input-place-link-error form__input-error"></span>

				</label>

			</fieldset>

		</PopupWithForm>
	)
}

export default AddPlacePopup;