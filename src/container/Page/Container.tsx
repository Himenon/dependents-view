import { DependencySet } from "@app/interface";
import { Parser } from "@app/infra";
import * as Domain from "@app/domain";
import * as React from "react";
import * as DependencyTableList from "../DependencyTableList";
import * as SidebarNavigation from "../SideNavigation";
import * as LinkList from "../LinkList";
import { generateStore, Store } from "./Store";
import { Page } from "@app/component";
import { useLocation, useParams, useHistory } from "react-router-dom";

const depsDataSet: DependencySet = require("@app/dataSet/deps.json");

const generateProps = (store: Store): Page.Props => {
  return {
    dependencyTableList: DependencyTableList.generateProps(store.dependencyTableList),
    sideNavigation: SidebarNavigation.generateProps(store.sideNavigation),
    linkList: LinkList.generateProps(store.linkList),
  };
};

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export const Container = () => {
  const query = useQuery();
  const history = useHistory();
  const { owner, name } = useParams();
  const packageName = !!name ? [owner, name].join("/") : owner;
  const repositoryOwner = query.get("owner") || undefined;
  const hostname = query.get("hostname") || undefined;
  const repo = query.get("repo") || undefined;
  const path = query.get("path") || undefined;
  const searchParams = Parser.parseStringSearchParams(query.get("q") || "");
  const reducers = Domain.App.createReducers(depsDataSet, { name: packageName, hostname, owner: repositoryOwner, repo, path }, searchParams);
  const createReducer = <T, S>([state, dispatch]: [T, S]): { state: T; dispatch: S } => ({ state, dispatch });
  const domainStores: Domain.App.Stores = {
    app: createReducer(React.useReducer(...reducers.app({ history }))),
  };
  const store = generateStore(domainStores);
  return <Page.Component {...generateProps(store)} />;
};
