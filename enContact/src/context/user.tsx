import { createContext, useState, type ReactNode } from "react";

interface User {
  email: string;
}

interface State {
  user: User;
  isAutentincated: boolean;
  signin: (user: User) => void;
  logout: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const userContext = createContext({} as State);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, signin] = useState<User>();
  const [isAutentincated, setIsAutentincated] = useState(
    JSON.parse(localStorage.getItem("isAutentincated")) ?? false,
  );

  const handleSignin = (user: User) => {
    signin(user);
    localStorage.setItem("isAutentincated", "true");
    setIsAutentincated(true);
  };

  const handleLogout = () => {
    signin(null);
    localStorage.setItem("isAutentincated", "false");
    setIsAutentincated(false);
  };

  return (
    <userContext.Provider
      value={{
        user,
        isAutentincated,
        signin: handleSignin,
        logout: handleLogout,
      }}
    >
      {children}
    </userContext.Provider>
  );
};
