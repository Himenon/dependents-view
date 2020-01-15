import * as React from "react";
const { Network, Graph } = require("@newtonjs/graph");
const classNames = require("./newton_graph.scss");
import "~@newtonjs/graph/dist/newton.css";

interface GraphNode {
  id: string;
  status?: string;
  label: string;
}

interface NodeLink {
  source: string;
  target: string;
}

export interface GraphData {
  nodes: GraphNode[];
  links: NodeLink[];
}

export interface NewtonGraphProps {
  data: GraphData;
}

const setupGraph = (data: GraphData) => {
  const network = new Network(data.nodes, data.links);
  const graph = new Graph({
    // width: window.innerWidth,
    // height: window.innerHeight,
    flow: "horizontal",
    draggable: true,
    network,
  });
  graph.init();
  graph.on("node:click", n => {
    graph.highlightDependencies(n, { arrows: true });
  });
  graph.on("node:mouseover", n => graph.showDependencies(n));
  graph.on("node:mouseout", graph.resetStyles);
};

export const NewtonGraph = ({ data }: NewtonGraphProps) => {
  React.useEffect(() => {
    setupGraph(data);
  });
  return <svg className={classNames.graphSvg} />;
};

export { NewtonGraphProps as Props, NewtonGraph as Component };
