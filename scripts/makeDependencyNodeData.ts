import * as fs from "fs";
import * as path from "path";
import { PackageJson } from "type-fest";
import * as Constants from "./Constants";
import { ExtractPackageJson, GraphData } from "@app/interface";

export interface Detail {
  packageJson: PackageJson;
}

export interface Store {
  details: Detail[];
}

export const getJson = (filename: string) => {
  return JSON.parse(fs.readFileSync(filename, { encoding: "utf-8" }));
};

const main = async () => {
  const store: Store = {
    details: [],
  };
  const graphData: GraphData = {
    nodes: [],
    links: [],
  };
  const details: ExtractPackageJson = getJson(Constants.PKG_DETAILS);
  details.repositories.map(async detail => {
    const fullPath = path.join(Constants.SAVE_DIR, detail.source.filename);
    const pkg: PackageJson = getJson(fullPath);
    graphData.nodes.push({
      id: `${pkg.name}`,
      label: `${pkg.name}`,
    });
    store.details.push({
      packageJson: pkg,
    });
  });

  // target
  graphData.nodes.forEach(graphNode => {
    // source
    const sourceList = store.details.filter(detail => {
      const dependencyList = Object.keys({ ...detail.packageJson.dependencies, ...detail.packageJson.devDependencies });
      return dependencyList.includes(graphNode.id);
    });
    sourceList.forEach(source => {
      const link = {
        source: `${source.packageJson.name}`,
        target: graphNode.id,
      };
      graphData.links.push(link);
    });
  });

  fs.writeFileSync(Constants.GRAPH_DATA, JSON.stringify(graphData, null, 2), { encoding: "utf-8" });
  console.log(`Save: ${Constants.GRAPH_DATA}`);
};

main().catch(console.error);
