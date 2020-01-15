export interface GraphNode {
  id: string;
  status?: string;
  label: string;
}

export interface NodeLink {
  source: string;
  target: string;
}

export interface GraphData {
  nodes: GraphNode[];
  links: NodeLink[];
}
