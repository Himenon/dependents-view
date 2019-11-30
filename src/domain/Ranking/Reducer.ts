import { ActionTypes } from "./Action";
import { DEFAULT_STATE, State } from "./State";

export const reducer = (state: State, action: ActionTypes): State => {
  switch (action.type) {
    default:
      return state;
  }
};

export type Reducer = [typeof reducer, State];

export const createReducer = (originDataSet: State["originDataSet"]): Reducer => {
  const state = { ...DEFAULT_STATE, originDataSet };
  return [reducer, state];
};
