import logo from '../images/logo.svg';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { IsLoggedInContext } from '../contexts/IsLoggedInContext';
import { UserDataContext } from '../contexts/UserDataContext';

function Header({
	onLogout,
	navPath
}
) {


	const userData = React.useContext(UserDataContext);

	function createNavElement(path) {


		if (isLoggedIn) {

			return (
				<>
					<p className="nav__item nav__user-info">{userData.email}</p>

					<NavLink to="/" className="nav__item nav__logout" onClick={onLogout}>
						Выйти
					</NavLink >
				</>
			)
		}


		if (path === "/sign-up") {

			return (

				<NavLink to="/sign-in" className="nav__item">
					Войти
				</NavLink >
			)
		} else if (path === "/sign-in") {

			return (

				<NavLink to="/sign-up" className="nav__item">
					Регистрация
				</NavLink >
			)
		}

	}

	const isLoggedIn = React.useContext(IsLoggedInContext);

	return (

		<header className="header page__header">

			<img
				className="header__logo"
				src={logo}
				alt="Логотип проекта"
			/>

			<nav className="nav">

				{createNavElement(navPath)}

			</nav>

		</header>
	)
}

export default Header;