import { State } from "./State";
import { Reducer, createReducer } from "./Reducer";
import { Dispatch } from "./Action";

export interface Reducers {
  app: Reducer;
}

export interface Stores {
  ranking: {
    state: State;
    dispatch: Dispatch;
  };
}

export const createReducers = (dataSet: State["originDataSet"]): Reducers => {
  return {
    app: createReducer(dataSet),
  };
};
