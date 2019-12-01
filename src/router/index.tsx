import React from "react";
import { Switch, Route, HashRouter as Router } from "react-router-dom";
import { RankingPage, Page, TopPage } from "@app/container";

export const AppRouter = () => {
  return (
    <Router hashType="noslash">
      <Switch>
        <Route key="/" path="/" exact={true} basename={process.env.PUBLIC_PATH}>
          <TopPage.Container />
        </Route>
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
