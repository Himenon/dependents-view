import * as fs from "fs";
import * as path from "path";
import { PackageJson } from "type-fest";
import { ExtractPackageJsonResult, StockInfo, DependencySet } from "@app/interface";
import * as Constants from "./Constants";

export interface Store {
  pkgs: {
    [name: string]: PackageJson;
  };
  stocks: {
    [name: string]: StockInfo;
  };
}

export const getJson = (filename: string) => {
  return require(filename);
};

const main = async () => {
  const store: Store = {
    pkgs: {},
    stocks: {},
  };
  const stockInfo: ExtractPackageJsonResult = getJson(Constants.PKG_DETAILS);
  stockInfo.packageJsonList.map(async stock => {
    const fullPath = path.join(Constants.SAVE_DIR, stock.filename);
    const pkg = getJson(fullPath);
    store.pkgs[pkg.name] = pkg;
    store.stocks[pkg.name] = stock;
  });

  const result: DependencySet = {};

  Object.keys(store.pkgs).forEach(libraryPkgName => {
    Object.values(store.pkgs).forEach(usedPkgJson => {
      if (usedPkgJson.name === libraryPkgName) {
        // 同じ名前の依存は取らない
        return;
      }
      const dependencyData = result[libraryPkgName];
      if (!dependencyData) {
        result[libraryPkgName] = {
          latest: store.pkgs[libraryPkgName].version || "",
          description: store.pkgs[libraryPkgName].description || "",
          sourceUrl: store.stocks[libraryPkgName].sourceUrl,
          repoName: store.stocks[libraryPkgName].repoName,
          repoUrl: store.stocks[libraryPkgName].repoUrl,
          createdAt: stockInfo.createdAt,
          dependencies: [],
          devDependencies: [],
        };
      } else {
        const usingPkgName = usedPkgJson.name || "";
        if (usedPkgJson.dependencies && usedPkgJson.dependencies[libraryPkgName] && store.stocks[usingPkgName]) {
          dependencyData.dependencies.push({
            name: usingPkgName,
            version: usedPkgJson.version || "",
            branch: store.stocks[usingPkgName].branch,
            sourceUrl: store.stocks[usingPkgName].sourceUrl,
            repo: {
              name: store.stocks[usingPkgName].repoName,
              url: store.stocks[usingPkgName].repoUrl,
            },
            required: usedPkgJson.dependencies[libraryPkgName],
          });
        }
        if (usedPkgJson.devDependencies && usedPkgJson.devDependencies[libraryPkgName] && store.stocks[usingPkgName]) {
          dependencyData.devDependencies.push({
            name: usingPkgName,
            version: usedPkgJson.version || "",
            branch: store.stocks[usingPkgName].branch,
            sourceUrl: store.stocks[usingPkgName].sourceUrl,
            repo: {
              name: store.stocks[usingPkgName].repoName,
              url: store.stocks[usingPkgName].repoUrl,
            },
            required: usedPkgJson.devDependencies[libraryPkgName],
          });
        }
      }
    });
  });
  fs.writeFileSync(Constants.DEPS_DATA, JSON.stringify(result, null, 2), { encoding: "utf-8" });
  console.log("保存しました");
};

main().catch(console.error);
