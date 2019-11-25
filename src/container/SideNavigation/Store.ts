import * as Domain from "@app/domain";

export const generateStore = (domainStores: Domain.Stores) => {
  return {
    depList: Object.keys(domainStores.app.state.deps),
    setTargetDependencySourcePath: (name: string | undefined) => {
      domainStores.app.dispatch({ type: "UPDATE_DEPENDENCY_NAME", sourcePath: name });
    },
    libraries: domainStores.app.state.displayDependencyList.libraries,
    searchPackageName: domainStores.app.state.searchPackageName,
    updateSearchPackageSourcePath: (name: string) => {
      domainStores.app.dispatch({ type: "UPDATE_SEARCH_PACKAGE_NAME", sourcePath: name });
    },
  };
};

export type Store = ReturnType<typeof generateStore>;
