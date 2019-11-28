import * as Domain from "@app/domain";

export const generateStore = (domainStores: Domain.Stores) => {
  return {
    menu: domainStores.app.state.menu,
    searchPackageName: domainStores.app.state.searchParams,
    updateSearchParams: (name: string | undefined) => {
      domainStores.app.dispatch({ type: "UPDATE_SEARCH_PARAMS", searchParams: { name } });
    },
  };
};

export type Store = ReturnType<typeof generateStore>;
