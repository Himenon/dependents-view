import * as Domain from "@app/domain";

export const generateStore = (domainStores: Domain.Stores) => {
  return {
    depList: Object.keys(domainStores.app.state.deps),
    updateSearchParams: (name: string) => {
      domainStores.app.dispatch({ type: "UPDATE_SEARCH_PARAMS", searchParams: { name } });
    },
    libraries: domainStores.app.state.displayDependencyList.libraries,
  };
};

export type Store = ReturnType<typeof generateStore>;
