import * as React from "react";
import { classNames } from "@app/style";
import { Link, LinkProps } from "@primer/components";
import * as DetailLink from "../DetailLink/DetailLink";

export interface SideNavigationProps {
  heading: LinkProps;
  searchInput: JSX.IntrinsicElements["input"];
  detailLinks: DetailLink.Props[];
}

export const SideNavigation = ({ heading, searchInput, detailLinks }: SideNavigationProps) => {
  return (
    <aside className={classNames("bg-gray-light border p-3 position-fixed")} style={{ width: 360, height: "100%" }}>
      <h5 className={classNames("text-gray mb-2 pb-1 border-bottom")}>
        <Link {...heading} />
      </h5>
      <input className={classNames("input-block form-control")} {...searchInput} style={{ marginBottom: "0.5em" }} />
      <nav className={classNames("SideNav overflow-y-scroll")} style={{ height: "80%" }}>
        {detailLinks.map((detailLink, idx) => {
          return <DetailLink.Component key={`side-nav-${idx}`} {...detailLink} />;
        })}
      </nav>
    </aside>
  );
};

export { SideNavigationProps as Props, SideNavigation as Component };
