import React from "react";

const user = {
 id: localStorage.getItem("userId"),
 name: localStorage.getItem("username"),
 accessToken: localStorage.getItem("accessToken")
};

const AuthContext = React.createContext({
 user,
 loading: false,
 error: null,
 loggedIn: user.id !== null && user.name !== null && user.accessToken !== null
});

export default AuthContext;
