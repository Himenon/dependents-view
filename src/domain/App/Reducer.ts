import { View } from "@app/interface";
import { ActionTypes } from "./Action";
import { DEFAULT_STATE, State } from "./State";
import { generatePageMenu, convertLibrariesToDisplayLibrary, convertSearchParamToQueryParams } from "./Converter";
import { searchFromInput, searchFromPageLoad } from "./Query";
import { QueryParams } from "@app/infra";
import { uniqueMenuItem } from "./Filter";

export const reducer = (hooks: View.Hooks) => (state: State, action: ActionTypes): State => {
  switch (action.type) {
    case "UPDATE_SEARCH_PARAMS": {
      const dataSet = searchFromInput(state.originDataSet, action.searchParams);
      const pageMenu = generatePageMenu(dataSet);
      const sideBarMenu = uniqueMenuItem(pageMenu);
      const q = QueryParams.appendQueryParams({ q: convertSearchParamToQueryParams(action.searchParams) });
      hooks.history.replace(`?${q}`);
      return { ...state, sideBarMenu, pageMenu, searchParams: action.searchParams };
    }
    case "UPDATE_PAGE_PARAMS": {
      const pageParams = { ...state.pageParams, ...action.pageParams };
      const dataSet = searchFromPageLoad(state.originDataSet, action.pageParams);
      const pageMenu = generatePageMenu(dataSet);
      const displayLibrary = convertLibrariesToDisplayLibrary(pageParams, state.originDataSet.libraries);
      return { ...state, pageMenu, displayLibrary, pageParams };
    }
    default:
      return state;
  }
};

export type Reducer = [ReturnType<typeof reducer>, State];

export const createReducer = (
  originDataSet: State["originDataSet"],
  pageParams: State["pageParams"] = DEFAULT_STATE.pageParams,
  searchParams: State["searchParams"] = DEFAULT_STATE.searchParams,
) => (hooks: View.Hooks): Reducer => {
  // ページ用のクエリで検索
  const dataSet = searchFromPageLoad(originDataSet, pageParams);
  const pageMenu = generatePageMenu(dataSet);
  // サイドメニュー用に検索
  const dataSetForMenu = searchFromInput(originDataSet, searchParams);
  const sideBarMenu = uniqueMenuItem(generatePageMenu(dataSetForMenu));

  const displayLibrary = convertLibrariesToDisplayLibrary(pageParams, originDataSet.libraries);

  const state: State = { ...DEFAULT_STATE, sideBarMenu, displayLibrary, originDataSet, pageParams, searchParams, pageMenu };
  return [reducer(hooks), state];
};
