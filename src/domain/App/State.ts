import { DependencySet, OriginLibrary, View } from "@app/interface";
import { convertDepsDataSetToLibraries, convertLibrariesToDisplayLibrary } from "./Converter";

const depsDataSet: DependencySet = require("@app/dataSet/deps.json");

export interface State {
  originDataSet: DependencySet;
  menu: View.Menu;
  displayLibrary: View.Library | OriginLibrary[] | undefined;
  searchParams: {
    name?: string;
    host?: string;
    owner?: string;
    repo?: string;
    path?: string;
  };
}

export const DEFAULT_STATE: State = {
  originDataSet: depsDataSet,
  menu: convertDepsDataSetToLibraries(depsDataSet),
  displayLibrary: convertLibrariesToDisplayLibrary(depsDataSet),
  searchParams: {},
};
