import * as React from "react";
import { classNames } from "@app/style";
import { Box, Heading, Link, LinkProps, Text, TextProps } from "@primer/components";

interface PackageDetailProps {
  name: LinkProps;
  version: TextProps;
  description: TextProps;
  repository: LinkProps;
}

const PackageDetail = ({ name, version, description, repository }: PackageDetailProps) => {
  return (
    <>
      <Heading mb={2}>
        <Link {...name} target="_blank" />
      </Heading>
      <Box key="dependencies" className={classNames("b-2")}>
        <div className={classNames("Subhead Subhead--spacious")}>
          <div className={classNames("Subhead-heading")}>package detail</div>
        </div>
        <Box className={classNames("markdown-body")}>
          <dl>
            <dt>Version</dt>
            <dd>
              <Text {...version} />
            </dd>
            <dt>Description</dt>
            <dd>
              <Text {...description} />
            </dd>
            <dt>Repository</dt>
            <dd>
              <Link {...repository} target="_blank" />
            </dd>
          </dl>
        </Box>
      </Box>
    </>
  );
};

export { PackageDetailProps as Props, PackageDetail as Component };
