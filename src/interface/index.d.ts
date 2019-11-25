export interface GitHubRepository {
  filename: string; // localのfilename
  sourceUrl: string; // GHE上のpath
  repoName: string; // repository name
  repoUrl: string; // repositoryのURL
  branch: string; // branch
}

export interface ExtractPackageJson {
  createdAt: string;
  repositories: GitHubRepository[];
}

export interface DependencyData {
  name: string; // package name
  version: string;
  repo: {
    name: string;
    url: string;
  };
  sourceUrl: string; // package.json path
  branch: string; // check branch
  required: string; // using version
}

export interface Library {
  packageName: string;
  latest: string;
  sourceUrl: string;
  description: string;
  repoName: string;
  repoUrl: string;
  createdAt: string;
  dependencies: DependencyData[];
  devDependencies: DependencyData[];
}

export interface DependencySet {
  libraries: Library[];
}
