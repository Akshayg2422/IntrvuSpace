import { Sidebar } from '@Components';
import { useSideNav } from '@Hooks';
import { Companies, OngoingInterviews, RecentInterviews, SuperAdminSchedules } from '@Modules';
import { ROUTES } from '@Routes';
import React, { useRef } from 'react';
import { useSelector } from "react-redux";
import { Navigate, useLocation } from 'react-router-dom';


type RequireAuthProps = {
    children: React.ReactNode;
}

export const RequireAuth = ({ children }: RequireAuthProps) => {

    const location = useLocation();


    const { sideNavOpen, toggleSideNav } = useSideNav();

    const { loginDetails } = useSelector((state: any) => state.AppReducer);

    const { isLoggedIn, user_type } = loginDetails || {}

    console.log("user_type", user_type);




    const mainContentRef = useRef(null);

    const routes = [
        {
            path: ROUTES['super-admin'].companies,
            name: "Companies",
            icon: "ni ni-chart-pie-35 text-info",
            layout: "",
            component: <Companies />
        },
        {
            path: ROUTES['super-admin']['admin-schedule'],
            name: "Schedules",
            icon: "ni ni-chart-pie-35 text-info",
            layout: "",
            component: <SuperAdminSchedules />
        },
        {
            path: ROUTES['super-admin']['recent-interviews'],
            name: "Recent Interviews",
            icon: "ni ni-chart-pie-35 text-info",
            layout: "",
            component: <RecentInterviews />
        },
        {
            path: ROUTES['super-admin']['ongoing-interview'],
            name: "Ongoing Interviews",
            icon: "ni ni-chart-pie-35 text-info",
            layout: "",
            component: <OngoingInterviews />
        },
    ];

    if (!isLoggedIn) {
        localStorage.setItem('route', location.pathname);
        return <Navigate to={ROUTES['auth-module'].login} state={{ path: location.pathname }} />
    }

    return (
        <div className={'screen'}>
            {user_type === 'SA' &&
                <Sidebar
                    routes={routes}
                    toggleSideNav={toggleSideNav}
                    sideNavOpen={sideNavOpen}
                />
            }
            <div className={'main-content'} ref={mainContentRef}>
                {children}
            </div>
            {
                sideNavOpen ? <div className="backdrop d-xl-none" onClick={toggleSideNav} /> : null
            }
        </div>
    )
}

export default RequireAuth;
