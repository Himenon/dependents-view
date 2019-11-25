import * as Domain from "@app/domain";

export const generateStore = (domainStores: Domain.Stores) => {
  return {
    depList: Object.keys(domainStores.app.state.deps),
    setTargetDependencySourceUrl: (sourcePath: string) => {
      domainStores.app.dispatch({ type: "UPDATE_DEPENDENCY_NAME", sourcePath });
    },
    libraries: domainStores.app.state.displayDependencyList.libraries,
  };
};

export type Store = ReturnType<typeof generateStore>;
