import * as React from "react";
import { TopPage } from "@app/component";
import { GraphData } from "@app/interface";

const graphData: GraphData = require("@app/dataSet/graph.json");

const generateProps = (): TopPage.Props => {
  return {
    headerNavigation: {
      links: [
        {
          to: "/",
          children: "TOP",
        },
        {
          to: "/packages",
          children: "package list",
        },
        {
          to: "/ranking",
          children: "ranking",
        },
      ],
    },
    newtonGraph: {
      data: graphData,
    },
  };
};

export const Container = () => {
  return <TopPage.Component {...generateProps()} />;
};
