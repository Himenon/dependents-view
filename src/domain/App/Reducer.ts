import { ActionTypes } from "./Action";
import { DEFAULT_STATE, State } from "./State";
import { searchParamsFilter } from "./Filter";

export const reducer = (state: State, action: ActionTypes): State => {
  switch (action.type) {
    case "UPDATE_SEARCH_PARAMS": {
      return searchParamsFilter(state, action.searchParams);
    }
    default:
      return state;
  }
};

export type Reducer = [typeof reducer, State];

export const createReducer = (searchParams: State["searchParams"] = DEFAULT_STATE.searchParams): Reducer => {
  return [reducer, { ...DEFAULT_STATE, searchParams }];
};
