import * as React from "react";
import { GraphData } from "@app/interface";
const { Network, Graph } = require("@newtonjs/graph");
const classNames = require("./newton_graph.scss");
import "~@newtonjs/graph/dist/newton.css";

export interface NewtonGraphProps {
  data: GraphData;
}

const setupGraph = (data: GraphData) => {
  const network = new Network(data.nodes, data.links);
  const graph = new Graph({
    width: window.innerWidth,
    height: window.innerHeight,
    flow: "horizontal",
    draggable: true,
    network,
  });
  graph.init();
  graph.on("node:click", n => {
    graph.highlightDependencies(n, { arrows: true });
  });
};

export const NewtonGraph = ({ data }: NewtonGraphProps) => {
  React.useEffect(() => {
    setupGraph(data);
  });
  return <svg transform="scale(0.5,0.5)" className={classNames.graphSvg} />;
};

export { NewtonGraphProps as Props, NewtonGraph as Component };
