import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoute = (): React.ReactElement => {
	const accessToken = localStorage.getItem('accessToken');

	return accessToken ? <Outlet /> : <Navigate to="/" replace />;
};
