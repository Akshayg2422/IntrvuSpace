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
        return <Navigate to={loginDetails?.is_admin ? ROUTES['designation-module'].designation : ROUTES['designation-module'].client} state={{ path: location.pathname }} />
    }

    return (
        <ScreenWrapper>
            {children}
        </ScreenWrapper>
    )
}

export default RequireHome;
