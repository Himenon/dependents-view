import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Page } from "@app/container";

export const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" basename={process.env.PUBLIC_PATH}>
          <Page.Container />
        </Route>
      </Switch>
    </Router>
  );
};
