import { ActionTypes } from "./Action";
import { DEFAULT_STATE, State } from "./State";
import { generatePageMenu, convertLibrariesToDisplayLibrary, convertSearchParamToQueryParams } from "./Converter";
import { searchFromInput, searchFromPageLoad } from "./Query";
import { QueryParams } from "@app/infra";
import { uniqueMenuItem } from "./Filter";

export const reducer = (state: State, action: ActionTypes): State => {
  switch (action.type) {
    case "UPDATE_SEARCH_PARAMS": {
      const dataSet = searchFromInput(state.originDataSet, action.searchParams);
      const pageMenu = generatePageMenu(dataSet);
      const sideBarMenu = uniqueMenuItem(pageMenu);
      QueryParams.updateQueryStringParameter("q", convertSearchParamToQueryParams(action.searchParams));
      return { ...state, sideBarMenu, pageMenu, searchParams: action.searchParams };
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
  // ページ用のクエリで検索
  const dataSet = searchFromPageLoad(originDataSet, pageParams);
  const pageMenu = generatePageMenu(dataSet);
  // サイドメニュー用に検索
  const dataSetForMenu = searchFromInput(originDataSet, searchParams);
  const sideBarMenu = uniqueMenuItem(generatePageMenu(dataSetForMenu));

  const displayLibrary = convertLibrariesToDisplayLibrary(pageParams, originDataSet.libraries);

  const state: State = { ...DEFAULT_STATE, sideBarMenu, displayLibrary, originDataSet, pageParams, searchParams, pageMenu };
  return [reducer, state];
};
