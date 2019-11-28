import { ActionTypes } from "./Action";
import { DEFAULT_STATE, State } from "./State";
import { filterPackageName, filterRepoName } from "./Filter";
import { convertDepsDataSetToLibraries, convertLibrariesToDisplayLibrary } from "./Converter";
import { isViewLibrary } from "./Validation";

export const searchDataSetWithSearchParams = (originDataSet: State["originDataSet"], searchParams: State["searchParams"]) => {
  return filterRepoName(searchParams.repo, filterPackageName(searchParams.name, originDataSet));
};

export const reducer = (state: State, action: ActionTypes): State => {
  switch (action.type) {
    case "UPDATE_SEARCH_PARAMS": {
      const dataSet = searchDataSetWithSearchParams(state.originDataSet, action.searchParams);
      const menu = convertDepsDataSetToLibraries(dataSet);
      const displayLibrary = isViewLibrary(state.displayLibrary) ? state.displayLibrary : convertLibrariesToDisplayLibrary(dataSet);
      return { ...state, menu, displayLibrary, searchParams: action.searchParams };
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
  const dataSet = searchDataSetWithSearchParams(originDataSet, pageParams);
  const displayLibrary = convertLibrariesToDisplayLibrary(dataSet);
  const menu = convertDepsDataSetToLibraries(originDataSet); // 復元時のメニューは全部出す
  const state: State = { ...DEFAULT_STATE, menu, displayLibrary, originDataSet, pageParams, searchParams };
  return [reducer, state];
};
