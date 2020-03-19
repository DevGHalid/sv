import React, { useReducer, useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import authReducer, {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from "../reducers/authReducer";
import {
  saveUserDataToLocalStorage,
  removeUserDataFromLocalStorage
} from "../helpers/authHelper";

export default function AuthProvider({ children }) {
  const authContext = useContext(AuthContext);
  const [auth, dispatch] = useReducer(authReducer, authContext);

  function login(user) {
    dispatch({
      type: LOGIN_REQUEST
    });

    axios
      .post(`${BASE_URL}/api/auth/login`, user)
      .then(response => {
        const user = {
          id: response.data.id,
          name: response.data.name,
          accessToken: response.data.accessToken
        };

        dispatch({
          type: LOGIN_SUCCESS,
          user
        });

        saveUserDataToLocalStorage(user);
      })
      .catch(error => {
        dispatch({
          type: LOGIN_FAIL,
          error: error.response.data.errors
        });
      });
  }

  function logout() {
    axios.post(`${BASE_URL}/api/auth/logout`).then(response => {
      if (response.data.loggedOut) {
        dispatch({
          type: LOGOUT
        });

        removeUserDataFromLocalStorage();
      }
    });
  }

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
