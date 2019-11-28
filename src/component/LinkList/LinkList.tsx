import * as React from "react";
import { classNames } from "@app/style";
import { Box, Heading, HeadingProps } from "@primer/components";
import * as DetailLink from "../DetailLink/DetailLink";

export interface LinkListProps {
  heading: HeadingProps;
  links: DetailLink.Props[];
}

export const LinkList = ({ links, heading }: LinkListProps) => {
  return (
    <Box m={4}>
      <Heading mb={2} {...heading} />
      <div>
        {links.map((link, idx) => {
          return (
            <div key={`link-list-${idx}`} className={classNames("col-4 float-left p-2")}>
              <DetailLink.Component {...link} />
            </div>
          );
        })}
      </div>
    </Box>
  );
};

export { LinkListProps as Props, LinkList as Component };
