import * as React from "react";
import { State } from "./State";

export interface UpdateSearchParams {
  type: "UPDATE_SEARCH_PARAMS";
  searchParams: State["searchParams"];
}

export interface UpdatePageParams {
  type: "UPDATE_PAGE_PARAMS";
  pageParams: State["pageParams"];
}

export type ActionTypes = UpdateSearchParams | UpdatePageParams;

export type Dispatch = React.Dispatch<ActionTypes>;
