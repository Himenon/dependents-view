import { State } from "./State";
import { filterIncludedPackageName, filterExactlyPackageName, filterRepoName } from "./Filter";

export const searchFromInput = (originDataSet: State["originDataSet"], searchParams: State["searchParams"]) => {
  return filterRepoName(searchParams.repo, filterIncludedPackageName(searchParams.name, originDataSet));
};

export const searchFromPageLoad = (originDataSet: State["originDataSet"], searchParams: State["searchParams"]) => {
  return filterRepoName(searchParams.repo, filterExactlyPackageName(searchParams.name, originDataSet));
};
