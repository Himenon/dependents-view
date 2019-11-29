import { DependencySet } from "@app/interface";
import * as App from "./App";
export { App };

export interface Reducers {
  app: App.Reducer;
}

export interface Stores {
  app: {
    state: App.State;
    dispatch: App.Dispatch;
  };
}

export const createReducers = (
  dataSet: DependencySet,
  pageParams: App.State["pageParams"],
  searchParams?: App.State["searchParams"],
): Reducers => {
  return {
    app: App.createReducer(dataSet, pageParams, searchParams),
  };
};
