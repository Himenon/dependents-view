export * from "./common";

import { OriginLibrary, GitHubRepository, PackageJsonData, RepoData, SourceData } from "./common";

import * as View from "./view";
export { View };

export interface ExtractMeta {
  hostname: string;
}

export interface ExtractPackageJson {
  createdAt: string;
  repositories: GitHubRepository[];
}

export interface DependencySet {
  meta: {
    updatedAt: string;
  };
  libraries: OriginLibrary[];
}
