import { OriginLibrary, GitHubRepository, PackageJsonData, RepoData, SourceData } from "./common";
import { useHistory } from "react-router-dom";

export interface DetailDependencyData {
  /** required version */
  required: string;
  /** From GitHubRepository */
  source: SourceData;
  repo: RepoData;
  /** extends */
  package: PackageJsonData;
}

export interface Library {
  /** GitHubRepository  */
  repo: RepoData;
  source: SourceData;
  /** extends  */
  package: PackageJsonData;
  dependencies: DetailDependencyData[];
  devDependencies: DetailDependencyData[];
}

export type MenuItem = OriginLibrary;

export interface Menu {
  items: MenuItem[];
}

export interface SearchParams {
  /** package name */
  name?: string;
  /** hostname */
  hostname?: string;
  /** repository owner */
  owner?: string;
  /** repository name */
  repo?: string;
  /** repository file path */
  path?: string;
}

export type PageParams = SearchParams;

export interface PageQueryParams extends SearchParams {
  q?: string;
}

export interface Hooks {
  history: ReturnType<typeof useHistory>;
}
