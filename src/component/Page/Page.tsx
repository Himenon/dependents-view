import * as React from "react";
import * as SideNavigation from "../SideNavigation/SideNavigation";
import * as LinkList from "../LinkList/LinkList";
import * as DependencyTableList from "../DependencyTableList/DependencyTableList";
import { BaseStyles, Box } from "@primer/components";
import { classNames } from "@app/style";

interface PageProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  dependencyTableList?: DependencyTableList.Props;
  linkList?: LinkList.Props;
  sideNavigation: SideNavigation.Props;
}

const Page = ({ dependencyTableList, sideNavigation, linkList, ...props }: PageProps) => {
  return (
    <BaseStyles>
      <Box className={classNames("border d-flex lex-wrap height-fit")}>
        <SideNavigation.Component {...sideNavigation} />
        <Box className={classNames("position-relative")} style={{ left: 360, width: "calc(100% - 360px)" }}>
          <Box className={classNames("p-5 border flex-auto position-relative overflow-y-hidden")}>
            {linkList && <LinkList.Component {...linkList} />}
            {dependencyTableList && <DependencyTableList.Component {...dependencyTableList} />}
          </Box>
        </Box>
      </Box>
    </BaseStyles>
  );
};

export { PageProps as Props, Page as Component };
