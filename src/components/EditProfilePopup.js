import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({
	isOpen: isEditProfilePopupOpen,
	onClose: closeAllPopups,
	onUpdateUser,
	buttonText
}) {

	const currentUser = React.useContext(CurrentUserContext);

	const [name, setName] = React.useState('');
	const [description, setDescription] = React.useState('');

	React.useEffect(() => {

		setName(currentUser.name);
		setDescription(currentUser.about);
	}, [currentUser]);

	function handleNameChange(e) {
		setName(e.target.value);
	}

	function handleDescriptionChange(e) {
		setDescription(e.target.value);
	}

	function handleSubmit(e) {

		e.preventDefault();

		onUpdateUser({
			name,
			about: description,
		});
	}

	return (

		<PopupWithForm
			isOpen={isEditProfilePopupOpen}
			onClose={closeAllPopups}
			onSubmit={handleSubmit}
			title="Редактировать профиль"
			name="profile"
			buttonText={buttonText}
		>

			<fieldset className="form__fieldset">

				<label className="form__field">

					<input
						id="input-name"
						className="form__input"
						value={name}
						placeholder="Имя"
						type="text"
						name="name"
						required
						minLength="2"
						maxLength="40"
						onChange={handleNameChange}
					/>
					<span className="input-name-error form__input-error"></span>

				</label>

				<label className="form__field">

					<input
						id="input-job"
						className="form__input"
						value={description}
						placeholder="О себе"
						type="text"
						name="job"
						required
						minLength="2"
						maxLength="200"
						onChange={handleDescriptionChange}
					/>
					<span className="input-job-error form__input-error"></span>

				</label>

			</fieldset>

		</PopupWithForm>
	)
}

export default EditProfilePopup;