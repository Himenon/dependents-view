import { View } from "@app/interface";

/**
 * name=sample1:owner=owner1 をparseす
 */
export const parseStringSearchParams = (searchParams: string): View.SearchParams => {
  const result: View.SearchParams = {};
  const searchParamKeys = ["name", "host", "owner", "repo", "path"];
  const keyValueStringList = searchParams.split("+");
  keyValueStringList.forEach(keyValueString => {
    const [key, value] = keyValueString.split(":");
    if (searchParamKeys.includes(key)) {
      result[key] = value;
    }
  });
  return result;
};
