import * as React from "react";
import { BaseStyles } from "@primer/components";
import * as HeaderNavigation from "../HeaderNavigation/HeaderNavigation";

export interface TopPageProps {
  headerNavigation: HeaderNavigation.Props;
}

export const TopPage = ({ headerNavigation }: TopPageProps) => {
  return (
    <BaseStyles>
      <HeaderNavigation.Component {...headerNavigation} />
    </BaseStyles>
  );
};

export { TopPageProps as Props, TopPage as Component };
