import React, { useContext, useEffect, useReducer } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Users from "../pages/Users";
import FormListsProvider from "../providers/FormListsProvider";
import FormLists from "../pages/formLists/FormLists";
import FormListProvider from "../providers/FormListProvider";
import FormList from "../pages/formList/FormList";
import FormListElementsProvider from "../providers/FormListElementsProvider";
import SheetsProvider from "../providers/SheetsProvider";

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
   <Route
    path="/form-lists"
    render={() => {
     return (
      <FormListsProvider>
       <FormLists />
      </FormListsProvider>
     );
    }}
    exact
   />
   <Route
    path="/form-lists/:id/edit"
    render={() => {
     return (
      <FormListProvider>
       <FormListElementsProvider>
        <SheetsProvider>
         <FormList />
        </SheetsProvider>
       </FormListElementsProvider>
      </FormListProvider>
     );
    }}
   />
   <Route path="/login" component={Login} />
  </Switch>
 );
}
