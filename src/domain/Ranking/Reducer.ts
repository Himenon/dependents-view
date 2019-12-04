import { ActionTypes } from "./Action";
import { DEFAULT_STATE, State } from "./State";
import { filterExactlyPackageName } from "./Filter";

export const reducer = (state: State, action: ActionTypes): State => {
  switch (action.type) {
    case "UPDATE_SEARCH_PARAMS": {
      const displayDataSet = filterExactlyPackageName(action.searchParams.packageName, state.originDataSet);
      return { ...state, displayDataSet };
    }
    default:
      return state;
  }
};

export type Reducer = [typeof reducer, State];

export const createReducer = (originDataSet: State["displayDataSet"]): Reducer => {
  const state = { ...DEFAULT_STATE, originDataSet, displayDataSet: originDataSet };
  return [reducer, state];
};
