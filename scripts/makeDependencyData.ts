import * as fs from "fs";
import * as path from "path";
import { PackageJson } from "type-fest";
import { ExtractPackageJson, GitHubRepository, OriginDependencyData, DependencySet } from "@app/interface";
import * as Constants from "./Constants";

export interface Detail {
  packageJson: PackageJson;
  repository: GitHubRepository;
}

export interface Store {
  details: Detail[];
}

export const getDeps = (pkgJsonName: string, details: Detail[], type: "dependencies" | "devDependencies"): OriginDependencyData[] => {
  return details
    .filter(detail => {
      // 自身は排除
      if (pkgJsonName === detail.packageJson.name) {
        return false;
      }
      const dep: PackageJson["dependencies"] = detail.packageJson[type];
      if (dep) {
        return Object.keys(dep).includes(pkgJsonName);
      }
      return false;
    })
    .map(detail => {
      const dep: PackageJson["dependencies"] = detail.packageJson[type];
      if (!dep) {
        throw new Error("dependenciesがだめ");
      }
      return {
        name: detail.packageJson.name || "",
        required: dep[pkgJsonName] || "",
        url: detail.repository.source.url,
      };
    });
};

export const getJson = (filename: string) => {
  return JSON.parse(fs.readFileSync(filename, { encoding: "utf-8" }));
};

const main = async () => {
  const store: Store = {
    details: [],
  };
  const details: ExtractPackageJson = getJson(Constants.PKG_DETAILS);
  details.repositories.map(async detail => {
    const fullPath = path.join(Constants.SAVE_DIR, detail.source.filename);
    const pkg: PackageJson = getJson(fullPath);
    store.details.push({
      packageJson: pkg,
      repository: detail,
    });
  });

  const dependencySet: DependencySet = {
    meta: {
      updatedAt: new Date().toISOString(),
    },
    libraries: [],
  };

  store.details.forEach(detail => {
    const repo = detail.repository;
    const pkgJson = detail.packageJson;
    const pkgJsonName = pkgJson.name;
    if (!pkgJsonName || pkgJsonName === "") {
      return;
    }
    dependencySet.libraries.push({
      package: {
        name: pkgJsonName,
        version: pkgJson.version || "",
        description: pkgJson.description || "",
      },
      dependencies: getDeps(pkgJsonName, store.details, "dependencies"),
      devDependencies: getDeps(pkgJsonName, store.details, "devDependencies"),
      ...repo,
    });
  });
  fs.writeFileSync(Constants.DEPS_DATA, JSON.stringify(dependencySet, null, 2), { encoding: "utf-8" });
  console.log(`Save: ${Constants.DEPS_DATA}`);
};

main().catch(console.error);
