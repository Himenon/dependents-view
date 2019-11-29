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
  name?: string;
  host?: string;
  owner?: string;
  repo?: string;
  path?: string;
}
