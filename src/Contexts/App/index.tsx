import React, { useState, createContext, useContext } from 'react';

export const AppContext = createContext({});

type AppProviderProps = {
  children?: React.ReactNode;
};

export const useApp = () =>
  useContext<{
    show?: boolean;
    setShowLoader?: (loader: boolean) => void;
    sideNavOpen?: boolean
    setSideNavOpen?: (show: boolean) => void;
  }>(AppContext);

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [show, setShowLoader] = useState(false);
  const [sideNavOpen, setSideNavOpen] = useState(true);


  return (
    <AppContext.Provider
      value={{
        show,
        setShowLoader,
        sideNavOpen,
        setSideNavOpen
      }}>
      {children}
    </AppContext.Provider>
  );
};
