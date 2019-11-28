import { DependencySet, OriginLibrary, View } from "@app/interface";

export interface State {
  originDataSet: DependencySet;
  menu: View.Menu;
  displayLibrary: View.Library | OriginLibrary[] | undefined;
  searchParams: {
    name?: string;
    host?: string;
    owner?: string;
    repo?: string;
    path?: string;
  };
  pageParams: {
    name?: string;
  };
}

export const DEFAULT_STATE: State = {
  originDataSet: {
    meta: {
      updatedAt: "",
    },
    libraries: [],
  },
  menu: { items: [] },
  displayLibrary: undefined,
  searchParams: {},
  pageParams: {},
};
