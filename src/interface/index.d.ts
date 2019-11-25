export interface StockInfo {
  filename: string; // localのfilename
  sourceUrl: string; // GHE上のpath
  repoName: string; // repository name
  repoUrl: string; // repositoryのURL
  branch: string; // branch
}

export interface ExtractPackageJsonResult {
  createdAt: string;
  packageJsonList: StockInfo[];
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

export interface DependencySet {
  [pkgName: string]:
    | {
        latest: string;
        sourceUrl: string;
        description: string;
        repoName: string;
        repoUrl: string;
        createdAt: string;
        dependencies: DependencyData[];
        devDependencies: DependencyData[];
      }
    | undefined;
}
