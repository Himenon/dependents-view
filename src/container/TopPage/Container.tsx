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
  };
};

export const Container = () => {
  return <TopPage.Component {...generateProps()} />;
};
