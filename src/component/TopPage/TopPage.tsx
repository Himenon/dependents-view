import * as React from "react";
import { classNames } from "@app/style";
import { BaseStyles, Box } from "@primer/components";
import { Link, LinkProps } from "react-router-dom";

export interface TopPageProps {
  links: LinkProps[];
}

export const TopPage = ({ links }: TopPageProps) => {
  return (
    <BaseStyles>
      <Box className={classNames("border d-flex lex-wrap height-fit")}>
        <ul>
          {links.map((link, idx) => (
            <li key={`${idx}.${link.to}`}>
              <Link {...link} />
            </li>
          ))}
        </ul>
      </Box>
    </BaseStyles>
  );
};

export { TopPageProps as Props, TopPage as Component };
