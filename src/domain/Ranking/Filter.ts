import { RankingDataSet } from "@app/interface";

export const filterExactlyPackageName = (inputName: string | undefined, rankingDataSet: RankingDataSet): RankingDataSet => {
  if (!inputName || inputName === "") {
    return rankingDataSet;
  }
  const filterName = inputName.toUpperCase();
  return {
    list: rankingDataSet.list.filter(lib => lib.packageName.toUpperCase() === filterName),
  };
};
