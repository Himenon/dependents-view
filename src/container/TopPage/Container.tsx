import * as React from "react";
import { TopPage } from "@app/component";

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
      data: {
        nodes: [
          { id: "w", label: "Web Frontend" },
          { id: "m", label: "Mobile Device" },
          { id: "b", label: "Monolith Backend" },
          { id: "d", label: "Database" },
        ],
        links: [
          { source: "w", target: "b" },
          { source: "m", target: "b" },
          { source: "b", target: "d" },
        ],
      },
    },
  };
};

export const Container = () => {
  return <TopPage.Component {...generateProps()} />;
};
