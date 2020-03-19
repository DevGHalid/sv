import React from "react";

const UsersContext = React.createContext({
  allUsers: [],
  loading: false,
  error: null
});

export default UsersContext;
