import { DependencySet } from "@app/interface";
const depsDataSet = require("@app/dataSet/deps.json");

export interface State {
  deps: DependencySet;
  displayDependencyList: DependencySet;
  name: string | undefined;
  searchPackageName: string | undefined;
}

export const DEFAULT_STATE: State = {
  deps: depsDataSet,
  displayDependencyList: depsDataSet,
  name: undefined,
  searchPackageName: undefined,
};
