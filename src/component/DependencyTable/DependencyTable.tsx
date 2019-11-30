import * as React from "react";
import { classNames } from "@app/style";
import { Link, LinkProps, Text, TextProps } from "@primer/components";

export interface Row {
  name: LinkProps; // package name
  version: TextProps;
  branch: TextProps; // check branch
  repo: LinkProps; // check branch
  required: TextProps; // using version
}

interface DependencyTableProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableElement>, HTMLTableElement> {
  rows: Row[];
  noDependenciesText: TextProps;
}

const DependencyTable = ({ rows, noDependenciesText, ...props }: DependencyTableProps) => {
  if (rows.length === 0) {
    return <Text {...noDependenciesText} />;
  }
  const TableHeader = (
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Required</th>
      <th scope="col">Repository</th>
      <th scope="col">Version</th>
      <th scope="col">Branch</th>
    </tr>
  );
  const TableData = rows.map((row, idx) => {
    return (
      <tr key={`dep-${idx}`}>
        <td key="name">
          <Link {...row.name} target="_blank" />
        </td>
        <td key="required">
          <Text {...row.required} />
        </td>
        <td key="repo">
          <Link {...row.repo} target="_blank" />
        </td>
        <td key="version">
          <Text {...row.version} />
        </td>
        <td key="branch">
          <Text {...row.branch} />
        </td>
      </tr>
    );
  });
  return (
    <div className={classNames("markdown-body")}>
      <table {...props}>
        <thead>{TableHeader}</thead>
        <tbody>{TableData}</tbody>
      </table>
    </div>
  );
};

export { DependencyTableProps as Props, DependencyTable as Component };
