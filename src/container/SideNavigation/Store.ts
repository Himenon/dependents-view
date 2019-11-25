import * as Domain from "@app/domain";

export const generateStore = (domainStores: Domain.Stores) => {
  return {
    depList: Object.keys(domainStores.app.state.deps),
    setTargetDependency: (name: string | undefined) => {
      domainStores.app.dispatch({ type: "UPDATE_DEPENDENCY_NAME", name });
    },
    displayDependencyList: domainStores.app.state.displayDependencyList,
    searchPackageName: domainStores.app.state.searchPackageName,
    updateSearchPackageName: (name: string) => {
      domainStores.app.dispatch({ type: "UPDATE_SEARCH_PACKAGE_NAME", name });
    },
  };
};

export type Store = ReturnType<typeof generateStore>;
