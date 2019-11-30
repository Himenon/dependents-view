import { RankingDataSet } from "@app/interface";

export interface State {
  originDataSet: RankingDataSet;
}

export const DEFAULT_STATE: State = {
  originDataSet: {
    list: [],
  },
};
