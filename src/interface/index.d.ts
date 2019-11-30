export * from "./common";

import { OriginLibrary, GitHubRepository, PackageJsonData, RepoData, SourceData } from "./common";

import * as View from "./view";
export { View };

export interface RankingPackageItem {
  packageName: string;
  usageLibraries: Array<{
    packageName: string;
    required: string;
    usageType: "dep" | "dev-dep";
    url: string;
  }>;
}

export interface RankingDataSet {
  list: RankingPackageItem[];
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
