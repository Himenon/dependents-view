import { DependencySet } from "@app/interface";
const depsDataSet = require("@app/dataSet/deps.json");

export interface State {
  deps: DependencySet;
  displayDependencyList: DependencySet;
  searchParams: {
    name?: string;
    host?: string;
    owner?: string;
    repo?: string;
    path?: string;
  };
}

export const DEFAULT_STATE: State = {
  deps: depsDataSet,
  displayDependencyList: depsDataSet,
  searchParams: {},
};
