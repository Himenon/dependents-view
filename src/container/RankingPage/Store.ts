import * as Domain from "@app/domain";

export const generateStore = (domainStores: Domain.Ranking.Stores) => {
  return {
    dataSet: domainStores.ranking.state.displayDataSet,
    updateSearchParams: (name: string | undefined) => {
      const searchParams = { packageName: name };
      domainStores.ranking.dispatch({ type: "UPDATE_SEARCH_PARAMS", searchParams });
    },
  };
};

export type Store = ReturnType<typeof generateStore>;
