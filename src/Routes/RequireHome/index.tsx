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
    const login = true

    if (login) {
        // return <Navigate to={ROUTES['designation-module'].} state={{ path: location.pathname }} />
    }

    return (
        <ScreenWrapper>
            {children}
        </ScreenWrapper>
    )
}

export default RequireHome;
