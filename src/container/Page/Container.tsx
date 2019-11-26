import * as Domain from "@app/domain";
import * as React from "react";
import * as DependencyTableList from "../DependencyTableList";
import * as SidebarNavigation from "../SideNavigation";
import * as LinkList from "../LinkList";
import { generateStore, Store } from "./Store";
import { Page } from "@app/component";
import { useLocation } from "react-router-dom";

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
  const sourcePath = query.get("sourcePath") || undefined;
  const reducers = Domain.createReducers(sourcePath);
  const createReducer = <T, S>([state, dispatch]: [T, S]): { state: T; dispatch: S } => ({ state, dispatch });
  const domainStores: Domain.Stores = {
    app: createReducer(React.useReducer(...reducers.app)),
  };
  const store = generateStore(domainStores);
  return <Page.Component {...generateProps(store)} />;
};