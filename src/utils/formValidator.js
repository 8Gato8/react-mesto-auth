export class FormValidator {

	constructor(validationSettings, formSelector) {

		this._formSelector = formSelector;
		this._formElement = document.querySelector(this._formSelector);
		this._submitButtonSelector = validationSettings.submitButtonSelector;
		this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
		this._validationSettings = validationSettings;
		this._inputSelector = validationSettings.inputSelector;
		this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
		this._inactiveButtonClass = validationSettings.inactiveButtonClass;
		this._inputErrorClass = validationSettings.inputErrorClass;
		this._errorClass = validationSettings.errorClass;
	}

	enableValidation() {

		this._setEventListeners();
	};

	_setEventListeners() {

		this._inputList.forEach(inputElement => {

			inputElement.addEventListener('input', () => {
				this._toggleInputErrorVisibility(inputElement);
				this._toggleButtonState();
			});
		});


	}

	checkFormValidity() {

		this._toggleButtonState();

		this._inputList.forEach(inputElement => {
			this._hideInputError(inputElement);
		})

	}

	_toggleButtonState() {

		if (this._hasInvalidInput()) {
			this._disableButtonElement();
		} else {
			this._activateButtonElement();
		}
	}

	_toggleInputErrorVisibility(inputElement) {

		if (!(this._isInputValid(inputElement))) {

			this._showInputError(inputElement, inputElement.validationMessage);
		} else {
			this._hideInputError(inputElement);
		}
	}

	_hasInvalidInput() {

		return this._inputList.some(inputElement => {

			if (!(inputElement.validity.valid)) return true;
		});
	}

	_activateButtonElement() {

		this._buttonElement.classList.remove(this._inactiveButtonClass);
		this._buttonElement.removeAttribute('disabled', true);
	}

	_disableButtonElement() {

		this._buttonElement.classList.add(this._inactiveButtonClass);
		this._buttonElement.setAttribute('disabled', true);
	}

	_isInputValid(inputElement) {

		if (inputElement.validity.valid) {

			return true;
		}
		return false;
	}

	_showInputError(inputElement, errorMessage) {

		const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

		inputElement.classList.add(this._inputErrorClass);

		errorElement.textContent = errorMessage;
		errorElement.classList.add(this._errorClass);
	}

	_hideInputError(inputElement) {

		const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

		inputElement.classList.remove(this._inputErrorClass);

		errorElement.classList.remove(this._errorClass);
		errorElement.textContent = '';
	}
}


export const validatorEditProfile = new FormValidator(formValidationSettings, profileFormId);
validatorEditProfile.enableValidation();

export const validatorAddCardProfile = new FormValidator(formValidationSettings, addPlaceFormId);
validatorAddCardProfile.enableValidation();

export const validatorUpdateAvatar = new FormValidator(formValidationSettings, updateAvatarFormId);
validatorUpdateAvatar.enableValidation();