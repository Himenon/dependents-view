import * as Domain from "@app/domain";

export const generateStore = (domainStores: Domain.Stores) => {
  return {
    menu: domainStores.app.state.menu,
    updateSearchParams: (name: string) => {
      domainStores.app.dispatch({ type: "UPDATE_SEARCH_PARAMS", searchParams: { name } });
    },
  };
};

export type Store = ReturnType<typeof generateStore>;
