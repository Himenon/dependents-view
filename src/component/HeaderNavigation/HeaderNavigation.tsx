import * as React from "react";
import { classNames } from "@app/style";
import { Link, LinkProps } from "react-router-dom";

export interface HeaderNavigationProps {
  links: LinkProps[];
}

export const HeaderNavigation = ({ links }: HeaderNavigationProps) => {
  return (
    <div className={classNames("Header")}>
      {links.map((link, idx) => (
        <div key={`${idx}.${link.to}`} className={classNames("Header-item")}>
          <Link className={classNames("text-white")} {...link} />
        </div>
      ))}
    </div>
  );
};

export { HeaderNavigationProps as Props, HeaderNavigation as Component };
