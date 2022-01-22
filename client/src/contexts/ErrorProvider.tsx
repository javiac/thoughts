import React from 'react';
import { ComponentType, createContext, useState } from 'react';

interface IErrorContextProps {
  error?: string;
  notifyError: (newError: string) => void;
}

export const ErrorContext = createContext<IErrorContextProps>({
  notifyError: () => {
    return;
  }
});

export const ThemeContext = React.createContext('light');

export const ErrorProvider: ComponentType = ({ children }) => {
  const [error, setError] = useState<string>();

  function notifyError(newError: string) {
    setError(newError);
    setTimeout(() => {
      setError(undefined);
    }, 3000);
    return;
  }

  return <ErrorContext.Provider value={{ error, notifyError }}>{children}</ErrorContext.Provider>;
};
