import * as React from "react";
import * as Domain from "@app/domain";
import { RankingDataSet } from "@app/interface";
import { generateStore, Store } from "./Store";
import { RankingPage } from "@app/component";

const depsDataSet: RankingDataSet = require("@app/dataSet/ranking.json");

const generateProps = (store: Store): RankingPage.Props => {
  return {
    headerNavigation: {
      links: [
        {
          to: "/",
          children: "TOP",
        },
        {
          to: "/packages",
          children: "package list",
        },
        {
          to: "/ranking",
          children: "ranking",
        },
      ],
    },
    searchInput: {
      type: "text",
      placeholder: "search package name",
      "aria-label": "search package name",
      onChange: event => {
        store.updateSearchParams(event.currentTarget.value);
      },
    },
    dataSet: store.dataSet,
  };
};

export const Container = () => {
  const reducers = Domain.Ranking.createReducers(depsDataSet);
  const createReducer = <T, S>([state, dispatch]: [T, S]): { state: T; dispatch: S } => ({ state, dispatch });
  const domainStores: Domain.Ranking.Stores = {
    ranking: createReducer(React.useReducer(...reducers.app)),
  };
  const store = generateStore(domainStores);
  return <RankingPage.Component {...generateProps(store)} />;
};
