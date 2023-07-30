import React from 'react';
import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from "react-redux";
import { ScreenWrapper } from '@Components'
import { ROUTES } from '@Routes'
import { USER_TOKEN } from '@Utils';



type RequireHomeProps = {
    children: React.ReactNode;
}

export const RequireHome = ({ children }: RequireHomeProps) => {

    const location = useLocation()
    const { loginUser } = useSelector((state: any) => state.AuthReducer);
    const login = localStorage.getItem(USER_TOKEN)

    if (loginUser?.details?.is_admin) {
        if (login) {
            return <Navigate to={ROUTES['designation-module'].designation} state={{ path: location.pathname }} />
        }
    }
    else {
        if (!login) {
            return <Navigate to={ROUTES['designation-module'].client} state={{ path: location.pathname }} />
        }
    }



    return (
        <ScreenWrapper>
            {children}
        </ScreenWrapper>
    )
}

export default RequireHome;
