import React, { useState, createContext, useContext } from 'react';

export const AppContext = createContext({});

type AppProviderProps = {
  children?: React.ReactNode;
};

export const useApp = () =>
  useContext<{
    show?: boolean;
    setShowLoader?: (loader: boolean) => void;
  }>(AppContext);

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [show, setShowLoader] = useState(false);

  return (
    <AppContext.Provider
      value={{
        show,
        setShowLoader,
      }}>
      {children}
    </AppContext.Provider>
  );
};
