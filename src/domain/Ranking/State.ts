import { RankingDataSet } from "@app/interface";

export interface State {
  originDataSet: RankingDataSet;
  displayDataSet: RankingDataSet;
}

export const DEFAULT_STATE: State = {
  originDataSet: {
    list: [],
  },
  displayDataSet: {
    list: [],
  },
};
