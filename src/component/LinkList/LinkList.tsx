import * as React from "react";
import { classNames } from "@app/style";
import { Box, Heading, HeadingProps, Link, LinkProps } from "@primer/components";

export interface LinkListProps {
  heading: HeadingProps;
  links: LinkProps[];
}

export const LinkList = ({ links, heading }: LinkListProps) => {
  return (
    <Box m={4}>
      <Heading mb={2} {...heading} />
      <div>
        {links.map((link, idx) => {
          return (
            <div key={`link-list-${idx}`} className={classNames("col-4 float-left p-2")}>
              <Link {...link} />
            </div>
          );
        })}
      </div>
    </Box>
  );
};

export { LinkListProps as Props, LinkList as Component };
