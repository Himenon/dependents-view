import { State } from "./State";
import { DependencySet } from "@app/interface";

export const filterPackageName = (inputName: string | undefined, dependencySet: DependencySet): DependencySet => {
  if (!inputName || inputName === "") {
    return dependencySet;
  }
  const filterName = inputName.toUpperCase();
  return {
    libraries: dependencySet.libraries.filter(lib => lib.packageName.toUpperCase().indexOf(filterName) > -1),
  };
};

export const searchParamsFilter = (state: State, searchParams: State["searchParams"]): State => {
  return { ...state, searchParams, displayDependencyList: filterPackageName(searchParams.name, state.deps) };
};
