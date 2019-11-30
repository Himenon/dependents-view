import * as Domain from "@app/domain";

export const generateStore = (domainStores: Domain.App.Stores) => {
  return {
    menu: domainStores.app.state.sideBarMenu,
    searchParams: domainStores.app.state.searchParams,
    updatePageParams: (name: string | undefined) => {
      domainStores.app.dispatch({ type: "UPDATE_PAGE_PARAMS", pageParams: { name } });
    },
    updateSearchParams: (name: string | undefined) => {
      const searchParams = { name };
      domainStores.app.dispatch({ type: "UPDATE_SEARCH_PARAMS", searchParams });
    },
  };
};

export type Store = ReturnType<typeof generateStore>;
