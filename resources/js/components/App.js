import React, { useContext, useEffect } from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import Login from "../pages/Login";
import Home from "../pages/Home";

import Sheets from "../pages/sheets/Sheets";
import SheetsProvider from "../providers/SheetsProvider";

import Sheet from "../pages/sheet/Sheet";
import SheetProvider from "../providers/SheetProvider";
import FormElementsProvider from "../providers/FormElementsProvider";
import SheetAnswersProvider from "../providers/SheetAnswersProvider";

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
      <Route
        exact
        path="/sheets"
        render={() => (
          <SheetsProvider>
            <Sheets />
          </SheetsProvider>
        )}
      />
      <Route
        path="/sheets/:id"
        render={() => (
          <SheetProvider>
            <SheetAnswersProvider>
              <FormElementsProvider>
                <Sheet />
              </FormElementsProvider>
            </SheetAnswersProvider>
          </SheetProvider>
        )}
      />
      <Redirect to="/home" />
    </Switch>
  );
}
