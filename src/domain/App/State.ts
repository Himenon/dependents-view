import { DependencySet, OriginLibrary, View } from "@app/interface";

export interface State {
  originDataSet: DependencySet;
  menu: View.Menu;
  pageMenu: View.Menu;
  displayLibrary: View.Library | OriginLibrary[] | undefined;
  searchParams: View.SearchParams;
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
  pageMenu: { items: [] },
  displayLibrary: undefined,
  searchParams: {},
  pageParams: {},
};
