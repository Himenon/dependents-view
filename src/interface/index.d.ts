export * from "./common";
export * from "./graph";

import { OriginLibrary, GitHubRepository, PackageJsonData, RepoData, SourceData } from "./common";

import * as View from "./view";
export { View };

export interface RankingPackageItem {
  rank?: number;
  packageName: string;
  usageLibraries: Array<{
    packageName: string;
    required: string;
    usageType: "dep" | "dev-dep";
    repo: {
      name: string;
      url: string;
    };
    source: {
      url: string;
      path: string;
    };
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
