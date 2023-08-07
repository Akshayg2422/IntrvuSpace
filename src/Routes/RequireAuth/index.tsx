import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { HOME_ROUTES, ROUTES } from '@Routes'
import { Sidebar } from '@Components'
import { icons } from '@Assets'
import { FCM_TOKEN, getDeviceInfo } from '@Utils'
import { PushNotification } from "@Modules";


type RequireAuthProps = {
    children: React.ReactNode;
}

export const RequireAuth = ({ children }: RequireAuthProps) => {


    const [sideNavOpen, setSideNavOpen] = useState(true);
    const mainContentRef = React.useRef<HTMLDivElement | null>(null);
    const location = useLocation();
    const { loginUser } = useSelector((state: any) => state.AuthReducer);
    const { removeSideNav } = useSelector((state: any) => state.DashboardReducer)



    useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.scrollingElement!.scrollTop = 0;
        if (mainContentRef.current) {
            mainContentRef.current.scrollTop = 0;
        }
    }, [location]);


    console.log("===========loginUser" + loginUser);


    if (!loginUser) {
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
            {loginUser?.details?.is_admin && !removeSideNav && <Sidebar
                routes={HOME_ROUTES}
                toggleSideNav={toggleSideNav}
                sideNavOpen={sideNavOpen}
                logo={{
                    innerLink: "/",
                    imgSrc: icons.logo,
                    imgAlt: "...",
                }}
            />}
            <div className='main-content' ref={mainContentRef}>
                <PushNotification />
                {children}
            </div>


            {sideNavOpen ? (
                <div className={"backdrop d-xl-none"} onClick={toggleSideNav} />
            ) : null}
        </>
    )
}

export default RequireAuth;
