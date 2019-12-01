import * as Domain from "@app/domain";

export const generateStore = (domainStores: Domain.Ranking.Stores) => {
  return {
    dataSet: domainStores.ranking.state.originDataSet,
  };
};

export type Store = ReturnType<typeof generateStore>;
