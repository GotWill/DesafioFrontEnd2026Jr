import { createContext, useState, type ReactNode } from "react";

interface User {
  email: string;
}

interface State {
  user: User;
  isAutentincated: boolean;
  setUser: (user: User) => void;
  logout: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const userContext = createContext({} as State);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>();
  const [isAutentincated, setIsAutentincated] = useState(false);

  const handleAddUser = (user: User) => {
    setUser(user);
    setIsAutentincated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAutentincated(false);
  };

  return (
    <userContext.Provider
      value={{ user, isAutentincated, setUser: handleAddUser, logout }}
    >
      {children}
    </userContext.Provider>
  );
};
