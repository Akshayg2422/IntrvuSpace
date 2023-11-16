/* eslint-disable @typescript-eslint/no-redeclare */
import { PageNotFound, ScreenWrapper } from "@Components";
import { Splash, Call } from '@Modules';
import { AUTH_ROUTES, JOB_SEEKER_ROUTES, ADMIN_ROUTES, ROUTES, RequireAuth, RequireHome, SUPER_ADMIN_ROUTES } from "@Routes";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useSelector } from 'react-redux';

/**
 *  select-react  - important need to add this app.js
 */
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@fullcalendar/common/main.min.css";
import "@fullcalendar/daygrid/main.min.css";
import "quill/dist/quill.core.css";
import "react-notification-alert/dist/animate.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import "select2/dist/css/select2.min.css";
import "sweetalert2/dist/sweetalert2.min.css";
import './App.css';




function App() {


  const { loginDetails } = useSelector((state: any) => state.AppReducer);

  const { is_admin, is_super_admin } = loginDetails || {}

  const AUTH = 1

  const getRoutes = (routes: any, type?: any) => {

    return routes && routes.length > 0 && routes.map((prop, key) => {

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

        {is_admin && getRoutes(ADMIN_ROUTES)}
        {!is_admin && getRoutes(JOB_SEEKER_ROUTES)}
        {is_super_admin && getRoutes(SUPER_ADMIN_ROUTES)}

        <Route path={ROUTES['designation-module'].interview + '/:schedule_id'} element={<Call />} />
        <Route path={"*"} element={<PageNotFound />} />
      </Routes>
      <ToastContainer />
    </ScreenWrapper >

  );
}

export default App;