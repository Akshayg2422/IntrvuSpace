import React from 'react';
import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from "react-redux";
import { ScreenWrapper } from '@Components'
import { ROUTES } from '@Routes'



type RequireHomeProps = {
    children: React.ReactNode;
}

export const RequireHome = ({ children }: RequireHomeProps) => {

    const location = useLocation()
    const { loginDetails } = useSelector(
        (state: any) => state.AppReducer
    );

    if (loginDetails?.isLoggedIn) {
        return <Navigate to={ROUTES['auth-module'].splash} state={{ path: location.pathname }} />
    }

    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    )
}

export default RequireHome;
