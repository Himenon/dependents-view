import * as React from "react";
import { BaseStyles } from "@primer/components";
import * as HeaderNavigation from "../HeaderNavigation/HeaderNavigation";
import * as NewtonGraph from "../NewtonGraph/NewtonGraph";

export interface TopPageProps {
  headerNavigation: HeaderNavigation.Props;
  newtonGraph: NewtonGraph.Props;
}

export const TopPage = ({ headerNavigation, newtonGraph }: TopPageProps) => {
  return (
    <BaseStyles>
      <HeaderNavigation.Component {...headerNavigation} />
      <NewtonGraph.Component {...newtonGraph} />
    </BaseStyles>
  );
};

export { TopPageProps as Props, TopPage as Component };
