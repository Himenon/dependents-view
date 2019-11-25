import { ActionTypes } from "./Action";
import { DEFAULT_STATE, State } from "./State";
import { DependencySet } from "@app/interface";

const filterPackageName = (inputName: string | undefined, dependencySet: DependencySet): DependencySet => {
  if (!inputName || inputName === "") {
    return dependencySet;
  }
  const filterName = inputName.toUpperCase();
  return {
    libraries: dependencySet.libraries.filter(lib => lib.packageName.toUpperCase().indexOf(filterName) > -1),
  };
};

export const reducer = (state: State, action: ActionTypes): State => {
  switch (action.type) {
    case "UPDATE_DEPENDENCY_NAME": {
      return { ...state, sourcePath: action.sourcePath };
    }
    case "UPDATE_SEARCH_PACKAGE_NAME": {
      return { ...state, searchPackageName: action.sourcePath, displayDependencyList: filterPackageName(action.sourcePath, state.deps) };
    }
    default:
      return state;
  }
};

export type Reducer = [typeof reducer, State];

export const createReducer = (sourcePath: string | undefined = DEFAULT_STATE.sourcePath): Reducer => {
  return [reducer, { ...DEFAULT_STATE, sourcePath }];
};
