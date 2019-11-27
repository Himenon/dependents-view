import * as React from "react";
import { State } from "./State";

export interface UpdateSearchParams {
  type: "UPDATE_SEARCH_PARAMS";
  searchParams: State["searchParams"];
}

export type ActionTypes = UpdateSearchParams;

export type Dispatch = React.Dispatch<ActionTypes>;
