import { ActionTypes } from "./Action";
import { DEFAULT_STATE, State } from "./State";
import { convertDepsDataSetToLibraries, convertLibrariesToDisplayLibrary, convertSearchParamToQueryParams } from "./Converter";
import { isViewLibrary } from "./Validation";
import { searchFromInput, searchFromPageLoad } from "./Query";
import { QueryParams } from "@app/infra";
import { uniqueMenuItem } from "./Filter";

export const reducer = (state: State, action: ActionTypes): State => {
  switch (action.type) {
    case "UPDATE_SEARCH_PARAMS": {
      const dataSet = searchFromInput(state.originDataSet, action.searchParams);
      const baseMenu = convertDepsDataSetToLibraries(dataSet);
      const menu = uniqueMenuItem(baseMenu);
      const pageMenu = baseMenu;
      const result = convertLibrariesToDisplayLibrary(dataSet);
      const displayLibrary = isViewLibrary(result) ? result : undefined;
      QueryParams.updateQueryStringParameter("q", convertSearchParamToQueryParams(action.searchParams));
      return { ...state, menu, pageMenu, displayLibrary, searchParams: action.searchParams };
    }
    case "UPDATE_PAGE_PARAMS": {
      return { ...state, pageParams: action.pageParams };
    }
    default:
      return state;
  }
};

export type Reducer = [typeof reducer, State];

export const createReducer = (
  originDataSet: State["originDataSet"],
  pageParams: State["pageParams"] = DEFAULT_STATE.pageParams,
  searchParams: State["searchParams"] = DEFAULT_STATE.searchParams,
): Reducer => {
  const dataSet = searchFromPageLoad(originDataSet, pageParams);
  const pageMenu = convertDepsDataSetToLibraries(dataSet);

  const dataSetForMenu = searchFromInput(originDataSet, searchParams);
  const menu = uniqueMenuItem(convertDepsDataSetToLibraries(dataSetForMenu));

  const result = convertLibrariesToDisplayLibrary(dataSet);
  const displayLibrary = isViewLibrary(result) ? result : undefined;

  const state: State = { ...DEFAULT_STATE, menu, displayLibrary, originDataSet, pageParams, searchParams, pageMenu };
  return [reducer, state];
};
