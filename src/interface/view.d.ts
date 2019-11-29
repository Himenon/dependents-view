import { OriginLibrary, GitHubRepository, PackageJsonData, RepoData, SourceData } from "./common";

export interface DetailDependencyData {
  required: string;
  package: PackageJsonData;
  source: SourceData;
  repo: RepoData;
}

export interface Library {
  package: PackageJsonData;
  source: SourceData;
  repo: RepoData;
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
