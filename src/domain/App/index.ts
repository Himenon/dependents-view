import { DependencySet } from "@app/interface";
import { State } from "./State";
import { Reducer, createReducer } from "./Reducer";
import { Dispatch } from "./Action";

export interface Reducers {
  app: Reducer;
}

export interface Stores {
  app: {
    state: State;
    dispatch: Dispatch;
  };
}

export const createReducers = (dataSet: DependencySet, pageParams: State["pageParams"], searchParams?: State["searchParams"]): Reducers => {
  return {
    app: createReducer(dataSet, pageParams, searchParams),
  };
};
