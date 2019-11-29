import { DependencySet, View } from "@app/interface";

export interface State {
  originDataSet: DependencySet;
  sideBarMenu: View.Menu;
  pageMenu: View.Menu;
  displayLibrary: View.Library | undefined;
  searchParams: View.SearchParams;
  pageParams: View.PageParams;
}

export const DEFAULT_STATE: State = {
  originDataSet: {
    meta: {
      updatedAt: "",
    },
    libraries: [],
  },
  sideBarMenu: { items: [] },
  pageMenu: { items: [] },
  displayLibrary: undefined,
  searchParams: {},
  pageParams: {},
};
