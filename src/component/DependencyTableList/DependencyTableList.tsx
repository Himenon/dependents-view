import * as React from "react";
import * as DependencyTable from "../DependencyTable/DependencyTable";
import * as PackageDetail from "../PackageDetail/PackageDetail";
import { Box } from "@primer/components";
import { classNames } from "@app/style";

export interface DependencyTableListProps {
  packageDetail: PackageDetail.Props;
  dependenciesTable: DependencyTable.Props;
  devDependenciesTable: DependencyTable.Props;
}

export const DependencyTableList = ({ packageDetail, dependenciesTable, devDependenciesTable }: DependencyTableListProps) => {
  return (
    <Box m={4}>
      <PackageDetail.Component {...packageDetail} />
      <Box key="dependencies" className={classNames("b-2")}>
        <div className={classNames("Subhead Subhead--spacious")}>
          <div className={classNames("Subhead-heading")}>dependencies</div>
        </div>
        <DependencyTable.Component {...dependenciesTable} />
      </Box>
      <Box key="devDependencies">
        <div className={classNames("Subhead Subhead--spacious")}>
          <div className={classNames("Subhead-heading")}>devDependencies</div>
        </div>
        <DependencyTable.Component {...devDependenciesTable} />
      </Box>
    </Box>
  );
};

export { DependencyTableListProps as Props, DependencyTableList as Component };
