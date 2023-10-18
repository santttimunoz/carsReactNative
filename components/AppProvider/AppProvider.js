import { createContext, useContext, useState } from 'react';

export const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [rents, setRents] = useState([]);
  const [cars, setCars] = useState([]);  

  return (
    <AppContext.Provider value={{ users, setUsers, rents, setRents, cars, setCars }}>
      {children}
    </AppContext.Provider>
  );
};