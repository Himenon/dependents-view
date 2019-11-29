export interface GitHubRepository {
  meta: ExtractMeta;
  source: SourceData;
  repo: RepoData;
}

export interface RepoData {
  owner: string;
  name: string;
  fullName: string;
  url: string;
  branch: string;
}

export interface PackageJsonData {
  name: string;
  version: string;
  description: string;
}

export interface SourceData {
  filename: string;
  path: string;
  url: string;
}

export interface OriginDependencyData {
  name: string;
  required: string;
  url: string;
}

export interface OriginLibrary extends GitHubRepository {
  package: PackageJsonData;
  dependencies: OriginDependencyData[];
  devDependencies: OriginDependencyData[];
}
