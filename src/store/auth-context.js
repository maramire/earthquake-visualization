import React from "react";
import { useCookies } from "react-cookie";

// creates context instance with default object
const AuthContext = React.createContext();

// Wrapper used to provide the context to its child components
export const AuthContextProvider = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies([
    "token",
    "isLoggedIn",
  ]);

  const login = (data) => {
    setCookie("token", data.idToken, {
      path: "/",
      expires: new Date(new Date().getTime() + 1000 * +data.expiresIn),
    });
    setCookie("isLoggedIn", true, {
      path: "/",
      expires: new Date(new Date().getTime() + 1000 * +data.expiresIn),
    });
  };
  const logout = () => {
    removeCookie("token", { path: "/" });
    removeCookie("isLoggedIn", { path: "/" });
  };

  const context = {
    isLoggedIn: cookies?.isLoggedIn,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={context}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
