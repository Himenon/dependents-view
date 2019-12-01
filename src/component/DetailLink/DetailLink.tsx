import * as React from "react";
import { classNames } from "@app/style";
import { Link, LinkProps } from "react-router-dom";
import { Text, TextProps } from "@primer/components";

export interface DetailLinkProps {
  link: LinkProps;
  detail?: TextProps;
}

export const DetailLink = ({ detail, link }: DetailLinkProps) => {
  if (detail) {
    const { children, ...props } = link;
    return (
      <Link className={classNames("SideNav-subItem")} {...props}>
        <p>{children}</p>
        <Text className={classNames("branch-name")} {...detail} />
      </Link>
    );
  }
  return <Link className={classNames("SideNav-subItem")} {...link} />;
};

export { DetailLinkProps as Props, DetailLink as Component };
