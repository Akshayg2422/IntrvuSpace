/* eslint-disable @typescript-eslint/no-redeclare */
import { ScreenWrapper, Breadcrumbs, Back } from "@Components";
import { Route, Routes } from "react-router-dom";
import { HOME_ROUTES, RequireAuth, DASHBOARD_ROUTES, AUTH_ROUTES, RequireHome } from "@Routes";
import { ToastContainer } from "react-toastify";
import { Splash } from '@Modules'
/**
 *  select-react  - important need to add this app.js
 */
import "select2/dist/css/select2.min.css";
import "react-notification-alert/dist/animate.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import "@fullcalendar/common/main.min.css";
import "@fullcalendar/daygrid/main.min.css";
import "sweetalert2/dist/sweetalert2.min.css";
import "quill/dist/quill.core.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { settingSideNavRemove } from "./Redux";





function App() {

  const AUTH = 1

  const { removeSideNav } = useSelector((state: any) => state.DashboardReducer)
  const [pathName, setPathName] = useState<any>('/client')
  const dispatch = useDispatch()

  useEffect(() => {
    if (window.location.pathname !== pathName && window.location.pathname !== '/schedules' && window.location.pathname !== '/call') {
      dispatch(settingSideNavRemove(false))
    }
    else if (window.location.pathname === pathName || window.location.pathname === '/schedules' || window.location.pathname === '/call') {
      dispatch(settingSideNavRemove(true))
    }
  }, [window.location.pathname])


  const getRoutes = (routes, type?: any) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }

      const path = prop.layout ? prop.layout + prop.path : prop.path;

      return (

        <Route
          path={path}
          element={type === AUTH ?
            <RequireHome>{prop.component}</RequireHome>
            :
            <RequireAuth>
              {prop.component}
            </RequireAuth>
          }
          key={key}
        />

      )

    });
  };

  return (
    <ScreenWrapper>

      <Routes>
        <Route path="/" element={<Splash />} />
        {getRoutes(AUTH_ROUTES, AUTH)}
        {getRoutes(HOME_ROUTES)}
        {getRoutes(DASHBOARD_ROUTES)}
      </Routes>


      <ToastContainer />
    </ScreenWrapper >

  );
}

export default App;