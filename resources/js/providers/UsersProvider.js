import React, { useContext, useReducer } from "react";
import UsersContext from "../contexts/UsersContext";
import usersReducer, {
  USERS_REQUEST,
  USERS_SUCCESS,
  USERS_FAIL
} from "../reducers/usersReducer";

export default function UsersProvider({ children }) {
  const initialState = useContext(UsersContext);
  const [users, dispatch] = useReducer(usersReducer, initialState);

  function fetchAllUsersFormApi() {
    dispatch({
      type: USERS_REQUEST
    });

    axios
      .get(`${BASE_URL}/api/users`)
      .then(response => {
        dispatch({
          type: USERS_SUCCESS,
          users: response.data
        });
      })
      .catch(error => {
        dispatch({
          type: USERS_FAIL,
          users: response.data
        });
      });
  }

  return (
    <UsersContext.Provider value={{ users, fetchAllUsersFormApi }}>
      {children}
    </UsersContext.Provider>
  );
}
