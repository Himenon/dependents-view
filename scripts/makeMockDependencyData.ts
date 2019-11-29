import * as fs from "fs";
import * as path from "path";
import { DependencySet } from "@app/interface";
import * as Constants from "./Constants";

const main = async () => {
  const dependencySet: DependencySet = {
    meta: {
      updatedAt: new Date().toISOString(),
    },
    libraries: [],
  };
  fs.mkdirSync(path.dirname(Constants.DEPS_DATA), { recursive: true });
  fs.writeFileSync(Constants.DEPS_DATA, JSON.stringify(dependencySet, null, 2), { encoding: "utf-8" });
};

main().catch(console.error);
