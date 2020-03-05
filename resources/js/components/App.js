import React, { useContext, useEffect, useReducer } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import FormListsProvider from "../providers/FormListsProvider";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Users from "../pages/Users";
import FormLists from "../pages/FormLists";

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
   <Route path="/users" component={Users} />
   <FormListsProvider>
    <Route path="/form-lists" component={FormLists} />
   </FormListsProvider>
   <Route path="/login" component={Login} />
  </Switch>
 );
}
