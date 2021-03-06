import * as React from "react";

export interface UpdateSearchParams {
  type: "UPDATE_SEARCH_PARAMS";
  searchParams: {
    packageName?: string;
  };
}

export type ActionTypes = UpdateSearchParams;

export type Dispatch = React.Dispatch<ActionTypes>;
