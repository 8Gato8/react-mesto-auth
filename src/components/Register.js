import React from "react";
import { NavLink, Navigate } from "react-router-dom";
import { IsLoggedInContext } from "../contexts/IsLoggedInContext";
import InfoTooltip from "./InfoTooltip";

import regSuccess from '../images/regSuccess.jpg';
import regFailure from '../images/regFailure.jpg';

function Register({
	onRender,
	onRegister,
	buttonText
}) {

	React.useEffect(() => {
		onRender("/sign-up");
	}, [onRender])

	const isLoggedIn = React.useContext(IsLoggedInContext);
	const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
	const [tooltipContent, setTooltipContent] = React.useState({ title: '', src: '' });

	const [formValues, setFormValues] = React.useState({
		email: '',
		password: ''
	});

	function handleChange(e) {

		const { name, value } = e.target;

		setFormValues({
			...formValues,
			[name]: value
		})

	}

	async function handleSubmit(e) {

		try {

			e.preventDefault();

			await onRegister(formValues);

			setFormValues({
				email: '',
				password: ''
			});

			setTooltipContent({
				title: 'Вы успешно зарегистрировались!',
				src: regSuccess
			});

			setIsInfoTooltipOpen(true);

		} catch (err) {

			setTooltipContent({
				title: 'Что-то пошло не так! Попробуйте ещё раз.',
				src: regFailure
			});

			setIsInfoTooltipOpen(true);

		}

	}

	if (isLoggedIn) {
		return <Navigate to="/" />
	}

	return (
		<>
			<div className="auth-container">

				<form
					className="auth-form form"
					onSubmit={handleSubmit}
				>
					<h2 className="form__title form__title_theme_dark title">Регистрация</h2>

					<fieldset className="form__fieldset">

						<label className="form__field">
							<input
								id="input-place-name"
								className="form__input form__input_theme_dark"
								value={formValues.email}
								placeholder="Email"
								type="email"
								name="email"
								required
								minLength="2"
								maxLength="30"
								onChange={handleChange}
							/>
							<span className="input-place-name-error form__input-error"></span>
						</label>

						<label className="form__field">
							<input
								id="input-place-link"
								className="form__input form__input_theme_dark"
								value={formValues.password}
								placeholder="Пароль"
								type="password"
								name="password"
								required
								onChange={handleChange}
							/>
							<span className="input-place-link-error form__input-error"></span>
						</label>

					</fieldset>

					<button
						className="form__submit-button form__submit-button_theme_dark"
						type="submit">{buttonText}
					</button>

				</form>

				<p className="auth-form__to-sign-in">Уже зарегистрированы? <NavLink className="auth-form__to-sign-in-link" to="/sign-in">Войти</NavLink></p>

			</div>

			<InfoTooltip isOpen={isInfoTooltipOpen} tooltipContent={tooltipContent} onOpen={setIsInfoTooltipOpen} onClose={setTooltipContent} />
		</>
	)
}

export default Register;