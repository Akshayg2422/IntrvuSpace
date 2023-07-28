import { ScreenWrapper, Breadcrumbs, Back } from "@Components";
import { Route, Routes } from "react-router-dom";
import { HOME_ROUTES, RequireAuth, DASHBOARD_ROUTES } from "@Routes";
import { ToastContainer } from "react-toastify";
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




function App() {

  const AUTH = 1


  const getRoutes = (routes, type?: any) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }

      const path = prop.layout ? prop.layout + prop.path : prop.path;

      return (
        <Route
          path={path}
          element={
            <RequireAuth>
             <div className={'ml-3'}>
             <div className="col">
                    <div className="row">
                        <Back />
                        <h5 className="ml-2 mt-1 text-muted"><Breadcrumbs/></h5>
                    </div>
                </div>
             </div>
              {prop.component}
            </RequireAuth>}
          key={key}
        />
      );

    });
  };

  return (
    <ScreenWrapper>
      <Routes>
        {getRoutes(HOME_ROUTES)}
        {getRoutes(DASHBOARD_ROUTES)}
      </Routes>
      <ToastContainer />
    </ScreenWrapper>

  );
}

export default App;
