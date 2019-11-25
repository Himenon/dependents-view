import * as React from "react";

export interface UpdateDependencyName {
  type: "UPDATE_DEPENDENCY_NAME";
  name: string | undefined;
}

export interface SearchPackageName {
  type: "UPDATE_SEARCH_PACKAGE_NAME";
  name: string;
}

export type ActionTypes = UpdateDependencyName | SearchPackageName;

export type Dispatch = React.Dispatch<ActionTypes>;
