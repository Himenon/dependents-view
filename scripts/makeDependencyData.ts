import * as fs from "fs";
import * as path from "path";
import { PackageJson } from "type-fest";
import { ExtractPackageJson, GitHubRepository, OriginLibrary as Library, DependencySet } from "@app/interface";
import * as Constants from "./Constants";

export interface Store {
  packageJson: {
    [url: string]: PackageJson;
  };
  repository: {
    [url: string]: GitHubRepository;
  };
}

export const getJson = (filename: string) => {
  return JSON.parse(fs.readFileSync(filename, { encoding: "utf-8" }));
};

const main = async () => {
  const store: Store = {
    packageJson: {},
    repository: {},
  };
  const details: ExtractPackageJson = getJson(Constants.PKG_DETAILS);
  details.repositories.map(async detail => {
    const fullPath = path.join(Constants.SAVE_DIR, detail.source.filename);
    const pkg: PackageJson = getJson(fullPath);
    store.packageJson[detail.source.url] = pkg;
    store.repository[detail.source.url] = detail;
  });

  const dependencySet: DependencySet = {
    meta: {
      updatedAt: new Date().toISOString(),
    },
    libraries: [],
  };

  Object.keys(store.packageJson).forEach(libSourceUrl => {
    Object.values(store.packageJson).forEach(usedPackageJson => {
      const pkgJson = store.packageJson[libSourceUrl];
      if (usedPackageJson.name === pkgJson.name) {
        return;
      }
      const pkgName = pkgJson.name || "";
      const repoData = store.repository[libSourceUrl];
      const lib: Library = {
        package: {
          name: pkgJson.name || "",
          version: pkgJson.version || "",
          description: pkgJson.description || "",
        },
        dependencies: [],
        devDependencies: [],
        ...repoData,
      };
      const usingPkgName = usedPackageJson.name || "";
      if (usedPackageJson.dependencies && usedPackageJson.dependencies[pkgName] && store.repository[usingPkgName]) {
        lib.dependencies.push({
          name: usingPkgName,
          version: usedPackageJson.version || "",
          required: usedPackageJson.dependencies[pkgName],
        });
      }
      if (usedPackageJson.devDependencies && usedPackageJson.devDependencies[pkgName] && store.repository[usingPkgName]) {
        lib.devDependencies.push({
          name: usingPkgName,
          version: usedPackageJson.version || "",
          required: usedPackageJson.devDependencies[pkgName],
        });
      }
      // // 重複削除
      if (dependencySet.libraries.findIndex(library => lib.source.url === library.source.url) === -1) {
        dependencySet.libraries.push(lib);
      }
    });
  });
  fs.writeFileSync(Constants.DEPS_DATA, JSON.stringify(dependencySet, null, 2), { encoding: "utf-8" });
  console.log("保存しました");
};

main().catch(console.error);
