import * as Domain from "@app/domain";

export const generateStore = (domainStores: Domain.Stores) => {
  return {
    menu: domainStores.app.state.menu,
    searchParams: domainStores.app.state.searchParams,
    updatePageParams: (name: string | undefined) => {
      domainStores.app.dispatch({ type: "UPDATE_PAGE_PARAMS", pageParams: { name } });
    },
    updateSearchParams: (name: string | undefined) => {
      domainStores.app.dispatch({ type: "UPDATE_SEARCH_PARAMS", searchParams: { name } });
    },
  };
};

export type Store = ReturnType<typeof generateStore>;
