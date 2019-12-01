import * as fs from "fs";
import * as path from "path";
import { DependencySet, RankingDataSet } from "@app/interface";
import * as Constants from "./Constants";

const main = async () => {
  const dependencySet: DependencySet = {
    meta: {
      updatedAt: new Date().toISOString(),
    },
    libraries: [],
  };
  const rankingDataSet: RankingDataSet = {
    list: [],
  };
  fs.mkdirSync(path.dirname(Constants.DEPS_DATA), { recursive: true });
  fs.writeFileSync(Constants.DEPS_DATA, JSON.stringify(dependencySet, null, 2), { encoding: "utf-8" });
  fs.writeFileSync(Constants.RANKING_DATA, JSON.stringify(rankingDataSet, null, 2), { encoding: "utf-8" });
};

main().catch(console.error);
