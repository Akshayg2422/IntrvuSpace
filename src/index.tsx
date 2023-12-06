import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

// plugins styles downloaded
import "./Assets/vendor/nucleo/css/nucleo.css";

// core styles
import "./Assets/scss/argon-dashboard-pro-react.scss?v1.2.1";

import { PersistGate } from "redux-persist/integration/react";

import { store, sagaMiddleware, rootSaga, persistor } from "@Redux";
import { AppProvider } from "@Contexts";

sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AppProvider>
    </PersistGate>
  </Provider>
);
reportWebVitals();
