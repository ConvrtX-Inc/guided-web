import React, { useState } from "react";
import { UserAccess } from "../shared/interfaces/UserAccess.interface";

const AuthContext = React.createContext({
  user: "",
  //usertype: "",
  userRole: {} as UserAccess,
  isLoggedIn: false,
  //login: (userdata: any, token: string, expirationTime: string) => {},
  login: (userdata: any, expirationTime: string) => {},
  logout: () => {},
});

/*const calculateRemainingTime = (expirationTime: string) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;
  return 20000;
};*/

//Get User roles
function GetUserRole() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  let access: UserAccess = {} as UserAccess;
  if (user && user.token) {
    access.user_id = user.user.id;
    access.user_type_name = user.user.user_type_name;
    access.is_subadmin_guide = user.user.is_subadmin_guide;
    access.is_subadmin_nonprofit = user.user.is_subadmin_nonprofit;
    access.is_subadmin_others = user.user.is_subadmin_others;
    //return user.user.user_type_name;
    return access;
  } else {
    return access;
  }
}

export const AuthContextProvider = (props: any) => {
  const initialUser = localStorage.getItem("user") || "";
  const [userData, setUserData] = useState(initialUser);
  const userIsLoggedIn = !!userData;
  const userRole = GetUserRole();

  const logoutHandler = () => {
    setUserData("");
    localStorage.removeItem("user");
  };

  const loginHandler = async (user: any, expirationTime: string) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUserData(user);

    //const remainingTime = calculateRemainingTime(expirationTime);
    //setTimeout(logoutHandler, remainingTime);
  };

  const contextValue = {
    user: userData,
    userRole: userRole,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
