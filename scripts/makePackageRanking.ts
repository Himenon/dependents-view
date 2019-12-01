import * as Constants from "./Constants";
import { RankingDataSet, ExtractPackageJson, GitHubRepository } from "@app/interface";
import { PackageJson } from "type-fest";
import * as fs from "fs";
import * as path from "path";

export interface Store {
  details: Array<{
    packageJson: PackageJson;
    repository: GitHubRepository;
  }>;
}

export interface ResultItem {
  package: PackageJson;
  repository: GitHubRepository;
  required: string;
  usageType: "dep" | "dev-dep";
}

export interface Result {
  [name: string]: Array<ResultItem>;
}

export const getJson = (filename: string) => {
  return JSON.parse(fs.readFileSync(filename, { encoding: "utf-8" }));
};

const main = async () => {
  const store: Store = {
    details: [],
  };
  const result: Result = {};
  const ranking: RankingDataSet = {
    list: [],
  };
  console.log(ranking);
  const allPackages: Set<string> = new Set();
  const details: ExtractPackageJson = getJson(Constants.PKG_DETAILS);
  details.repositories.map(async detail => {
    const fullPath = path.join(Constants.SAVE_DIR, detail.source.filename);
    const pkg: PackageJson = getJson(fullPath);
    store.details.push({
      packageJson: pkg,
      repository: detail,
    });
  });
  store.details.forEach(detail => {
    const pkg = detail.packageJson;
    const dep = pkg.dependencies || {};
    const devDep = pkg.devDependencies || {};
    Object.keys(dep).forEach(name => {
      const item: ResultItem = {
        package: pkg,
        repository: detail.repository,
        required: dep[name],
        usageType: "dep",
      };
      if (name in result) {
        result[name].push(item);
      } else {
        result[name] = [item];
      }
      allPackages.add(name);
    });
    Object.keys(devDep).forEach(name => {
      const item: ResultItem = {
        package: pkg,
        repository: detail.repository,
        required: dep[name],
        usageType: "dev-dep",
      };
      if (name in result) {
        result[name].push(item);
      } else {
        result[name] = [item];
      }
      allPackages.add(name);
    });
  });

  Object.entries(result).forEach(([name, items]) => {
    ranking.list.push({
      packageName: name,
      usageLibraries: items.map(item => {
        return {
          packageName: item.package.name || "",
          required: item.required,
          usageType: item.usageType,
          repo: {
            name: item.repository.repo.fullName,
            url: item.repository.repo.url,
          },
          source: {
            url: item.repository.source.url,
            path: item.repository.source.path,
          },
        };
      }),
    });
  });

  ranking.list = ranking.list
    .sort((a, b) => {
      return a.usageLibraries.length > b.usageLibraries.length ? -1 : 1;
    })
    .map((item, idx) => {
      return { ...item, rank: idx + 1 };
    });

  fs.writeFileSync(Constants.RANKING_DATA, JSON.stringify(ranking, null, 2), { encoding: "utf-8" });
  console.log(`Save: ${Constants.RANKING_DATA}`);
};

main().catch(console.error);
