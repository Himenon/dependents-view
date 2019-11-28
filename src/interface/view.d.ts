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

export interface MenuItem {
  name: string;
}

export interface Menu {
  items: MenuItem[];
}