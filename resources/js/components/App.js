import React, { useContext, useEffect } from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
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
   <Route path="/home" component={Home} exact />
   <Route path="/login" component={Login} />
   <Redirect to="/home" />
  </Switch>
 );
}
