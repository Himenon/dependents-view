import { ActionTypes } from "./Action";
import { DEFAULT_STATE, State } from "./State";
import { filterPackageName } from "./Filter";
import { convertDepsDataSetToLibraries, convertLibrariesToDisplayLibrary } from "./Converter";

export const searchParamsFilter = (state: State, searchParams: State["searchParams"]): State => {
  const dataSet = filterPackageName(searchParams.name, state.originDataSet);
  const displayLibrary = convertLibrariesToDisplayLibrary(dataSet);
  return { ...state, searchParams, menu: convertDepsDataSetToLibraries(dataSet), displayLibrary };
};

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
