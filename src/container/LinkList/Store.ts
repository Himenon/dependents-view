import { View } from "@app/interface";
import * as Domain from "@app/domain";

export const generateStore = (domainStores: Domain.App.Stores) => {
  const library = domainStores.app.state.displayLibrary;
  if (library) {
    return undefined;
  }
  return {
    menu: domainStores.app.state.pageMenu,
    updatePageParams: (pageParams: View.PageParams) => {
      domainStores.app.dispatch({ type: "UPDATE_PAGE_PARAMS", pageParams });
    },
    canShowDetail: domainStores.app.state.pageMenu.items.length < 5,
  };
};

export type Store = ReturnType<typeof generateStore>;
