import { ROUTES } from '@Routes';
import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { Navigate, useLocation } from 'react-router-dom';



type RequireAuthProps = {
    children: React.ReactNode;
}

export const RequireAuth = ({ children }: RequireAuthProps) => {


    console.log('RequireAuth');

    const [sideNavOpen, setSideNavOpen] = useState(true);
    const mainContentRef = React.useRef<HTMLDivElement | null>(null);
    const location = useLocation();
    const { loginDetails } = useSelector((state: any) => state.AppReducer);

    useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.scrollingElement!.scrollTop = 0;
        if (mainContentRef.current) {
            mainContentRef.current.scrollTop = 0;
        }
    }, [location]);



    if (!loginDetails?.isLoggedIn) {
        localStorage.setItem('route', location.pathname);
        return <Navigate to={ROUTES['auth-module'].login} state={{ path: location.pathname }} />
    }


    const toggleSideNav = () => {
        if (document.body.classList.contains("g-sidenav-pinned")) {
            document.body.classList.remove("g-sidenav-pinned");
            document.body.classList.add("g-sidenav-hidden");
        } else {
            document.body.classList.add("g-sidenav-pinned");
            document.body.classList.remove("g-sidenav-hidden");
        }
        setSideNavOpen(!sideNavOpen);
    };

    return (
        <>
            <div className='main-content' ref={mainContentRef}>
                {children}
            </div>

            {
                sideNavOpen ? <div className={'backdrop d-xl-none'} onClick={toggleSideNav} /> : null
            }
        </>
    )
}

export default RequireAuth;
