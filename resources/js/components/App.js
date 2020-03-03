import React, { useContext, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import Login from "../pages/Login";
import Home from "../pages/Home";

export default function App() {
 const history = useHistory();
 const { auth } = useContext(AuthContext);

 useEffect(() => {
  if (!auth.loggedIn) {
   history.push("/login");
  }
 }, [auth.loggedIn]);

 return (
  <Switch>
   <Route path="/" component={Home} exact />
   <Route path="/login" component={Login} />
  </Switch>
 );
}
