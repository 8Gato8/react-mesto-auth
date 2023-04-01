import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({
	isOpen: isEditAvatarPopupOpen,
	onClose: closeAllPopups,
	onUpdateAvatar,
	buttonText
}) {

	const [avatar, setAvatar] = React.useState('')

	function handleAvatarChange(e) {

		setAvatar(e.target.value);
	}

	function handleSubmit(e) {

		e.preventDefault();

		onUpdateAvatar({
			avatar,
		});

	}

	React.useEffect(() => {

		setAvatar('')
	}, [isEditAvatarPopupOpen]);

	return (

		<PopupWithForm
			isOpen={isEditAvatarPopupOpen}
			onClose={closeAllPopups}
			onSubmit={handleSubmit}
			title="Обновить аватар"
			name="update-avatar"
			buttonText={buttonText}
		>

			<fieldset className="form__fieldset">

				<label className="form__field">

					<input
						id="input-avatar-link"
						className="form__input"
						value={avatar}
						placeholder="Ссылка на новый аватар"
						type="url"
						name="avatar"
						required
						onChange={handleAvatarChange}
					/>
					<span className="input-avatar-link-error form__input-error"></span>

				</label>

			</fieldset>

		</PopupWithForm>
	)
}

export default EditAvatarPopup;