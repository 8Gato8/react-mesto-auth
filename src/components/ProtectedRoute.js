import React from 'react';
import { Navigate } from "react-router-dom";
import { IsLoggedInContext } from '../contexts/IsLoggedInContext';

const ProtectedRoute = ({ element: Component, ...props }) => {

	const isLoggedIn = React.useContext(IsLoggedInContext);

	return (
		isLoggedIn ? <Component {...props} /> : <Navigate to="/sign-in" />
	)
};

export default ProtectedRoute;