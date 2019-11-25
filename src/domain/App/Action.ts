import * as React from "react";

export interface UpdateDependencyName {
  type: "UPDATE_DEPENDENCY_NAME";
  sourcePath: string | undefined;
}

export interface SearchPackageName {
  type: "UPDATE_SEARCH_PACKAGE_NAME";
  sourcePath: string;
}

export type ActionTypes = UpdateDependencyName | SearchPackageName;

export type Dispatch = React.Dispatch<ActionTypes>;
