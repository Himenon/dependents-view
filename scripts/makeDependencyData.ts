import * as fs from "fs";
import * as path from "path";
import { PackageJson } from "type-fest";
import { ExtractPackageJson, GitHubRepository, Library, DependencySet } from "@app/interface";
import * as Constants from "./Constants";

export interface Store {
  packageJson: {
    [url: string]: PackageJson;
  };
  repository: {
    [name: string]: GitHubRepository;
  };
}

export const getJson = (filename: string) => {
  return require(filename);
};

const main = async () => {
  const store: Store = {
    packageJson: {},
    repository: {},
  };
  const extractPackageJsonResult: ExtractPackageJson = getJson(Constants.PKG_DETAILS);
  extractPackageJsonResult.repositories.map(async stock => {
    const fullPath = path.join(Constants.SAVE_DIR, stock.filename);
    const pkg = getJson(fullPath);
    store.packageJson[stock.filename] = pkg;
    store.repository[stock.filename] = stock;
  });

  const dependencySet: DependencySet = {
    libraries: [],
  };

  Object.keys(store.packageJson).forEach(libFileName => {
    Object.values(store.packageJson).forEach(usedPackageJson => {
      if (usedPackageJson.name === libFileName) {
        return;
      }
      const lib: Library = {
        packageName: store.packageJson[libFileName].name || "",
        latest: store.packageJson[libFileName].version || "",
        description: store.packageJson[libFileName].description || "",
        sourceUrl: store.repository[libFileName].sourceUrl,
        repoName: store.repository[libFileName].repoName,
        repoUrl: store.repository[libFileName].repoUrl,
        createdAt: extractPackageJsonResult.createdAt,
        dependencies: [],
        devDependencies: [],
      };
      const usingPkgName = usedPackageJson.name || "";
      if (usedPackageJson.dependencies && usedPackageJson.dependencies[libFileName] && store.repository[usingPkgName]) {
        lib.dependencies.push({
          name: usingPkgName,
          version: usedPackageJson.version || "",
          branch: store.repository[usingPkgName].branch,
          sourceUrl: store.repository[usingPkgName].sourceUrl,
          repo: {
            name: store.repository[usingPkgName].repoName,
            url: store.repository[usingPkgName].repoUrl,
          },
          required: usedPackageJson.dependencies[libFileName],
        });
      }
      if (usedPackageJson.devDependencies && usedPackageJson.devDependencies[libFileName] && store.repository[usingPkgName]) {
        lib.devDependencies.push({
          name: usingPkgName,
          version: usedPackageJson.version || "",
          branch: store.repository[usingPkgName].branch,
          sourceUrl: store.repository[usingPkgName].sourceUrl,
          repo: {
            name: store.repository[usingPkgName].repoName,
            url: store.repository[usingPkgName].repoUrl,
          },
          required: usedPackageJson.devDependencies[libFileName],
        });
      }
      if (dependencySet.libraries.findIndex(library => library.sourceUrl === lib.sourceUrl) === -1) {
        dependencySet.libraries.push(lib);
      }
    });
  });
  fs.writeFileSync(Constants.DEPS_DATA, JSON.stringify(dependencySet, null, 2), { encoding: "utf-8" });
  console.log("保存しました");
};

main().catch(console.error);
