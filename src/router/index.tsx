import React from "react";
import { Switch, Route, HashRouter as Router } from "react-router-dom";
import { RankingPage, Page } from "@app/container";

export const AppRouter = () => {
  return (
    <Router hashType="noslash">
      <Switch>
        <Route key="/packages/" path="/packages/:owner?/:name?" basename={process.env.PUBLIC_PATH}>
          <Page.Container />
        </Route>
        <Route key="/ranking" path="/ranking" basename={process.env.PUBLIC_PATH}>
          <RankingPage.Container />
        </Route>
      </Switch>
    </Router>
  );
};
