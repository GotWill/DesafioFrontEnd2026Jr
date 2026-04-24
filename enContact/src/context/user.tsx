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
  const [isAutentincated, setIsAutentincated] = useState(
    JSON.parse(localStorage.getItem("isAutentincated")) ?? false,
  );

  const handleAddUser = (user: User) => {
    setUser(user);
    localStorage.setItem("isAutentincated", "true");
    setIsAutentincated(true);
  };

  const logout = () => {
    setUser(null);
    localStorage.setItem("isAutentincated", "false");
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
