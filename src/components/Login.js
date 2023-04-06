import React from "react";
import { Navigate } from "react-router-dom";
import { IsLoggedInContext } from "../contexts/IsLoggedInContext";

function Login({
	setUserData,
	onRender,
	onLogin,
	buttonText
}) {


	React.useEffect(() => {
		onRender("/sign-in");
	}, [onRender])

	const isLoggedIn = React.useContext(IsLoggedInContext);

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

		e.preventDefault();

		await onLogin(formValues);
		setUserData(formValues);

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
					<h2 className="form__title form__title_theme_dark title">Вход</h2>

					<fieldset className="form__fieldset">

						<label className="form__field">
							<input
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

			</div>
		</>
	)
}

export default Login;