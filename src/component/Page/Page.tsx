import * as React from "react";
import * as SideNavigation from "../SideNavigation/SideNavigation";
import * as LinkList from "../LinkList/LinkList";
import * as DependencyTableList from "../DependencyTableList/DependencyTableList";
import * as HeaderNavigation from "../HeaderNavigation/HeaderNavigation";
import { BaseStyles, Box } from "@primer/components";
import { classNames } from "@app/style";

interface PageProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  headerNavigation: HeaderNavigation.Props;
  dependencyTableList?: DependencyTableList.Props;
  linkList?: LinkList.Props;
  sideNavigation: SideNavigation.Props;
}

const Page = ({ dependencyTableList, sideNavigation, linkList, headerNavigation, ...props }: PageProps) => {
  return (
    <BaseStyles>
      <HeaderNavigation.Component {...headerNavigation} />
      <Box className={classNames("border d-flex lex-wrap height-fit")}>
        <SideNavigation.Component {...sideNavigation} />
        <Box className={classNames("position-relative")} style={{ left: 360, width: "calc(100% - 360px)" }}>
          <Box className={classNames("p-5 border flex-auto position-relative overflow-y-hidden")}>
            {linkList && <LinkList.Component {...linkList} />}
            {dependencyTableList && <DependencyTableList.Component {...dependencyTableList} />}
            {!linkList && !dependencyTableList && "Not found."}
          </Box>
        </Box>
      </Box>
    </BaseStyles>
  );
};

export { PageProps as Props, Page as Component };
