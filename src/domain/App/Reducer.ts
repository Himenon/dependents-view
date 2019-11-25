import { ActionTypes } from "./Action";
import { DEFAULT_STATE, State } from "./State";
import { DependencySet } from "@app/interface";

const filterPackageName = (inputName: string | undefined, dependencySet: DependencySet): DependencySet => {
  if (!inputName || inputName === "") {
    return dependencySet;
  }
  const filterName = inputName.toUpperCase();
  const filteredPackageName = Object.keys(dependencySet).filter(pkgName => pkgName.toUpperCase().indexOf(filterName) > -1);
  return filteredPackageName.reduce((filteredDependencySet, name) => {
    return { ...filteredDependencySet, [name]: dependencySet[name] };
  }, {});
};

export const reducer = (state: State, action: ActionTypes): State => {
  switch (action.type) {
    case "UPDATE_DEPENDENCY_NAME": {
      return { ...state, name: action.name };
    }
    case "UPDATE_SEARCH_PACKAGE_NAME": {
      return { ...state, searchPackageName: action.name, displayDependencyList: filterPackageName(action.name, state.deps) };
    }
    default:
      return state;
  }
};

export type Reducer = [typeof reducer, State];

export const createReducer = (name: string | undefined = DEFAULT_STATE.name): Reducer => {
  return [reducer, { ...DEFAULT_STATE, name }];
};
