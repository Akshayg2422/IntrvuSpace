import { ROUTES } from '@Routes';
import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { Navigate, useLocation } from 'react-router-dom';



type RequireAuthProps = {
    children: React.ReactNode;
}

export const RequireAuth = ({ children }: RequireAuthProps) => {

    const location = useLocation();
    const { loginDetails } = useSelector((state: any) => state.AppReducer);



    if (!loginDetails?.isLoggedIn) {
        localStorage.setItem('route', location.pathname);
        return <Navigate to={ROUTES['auth-module'].login} state={{ path: location.pathname }} />
    }

    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    )
}

export default RequireAuth;
