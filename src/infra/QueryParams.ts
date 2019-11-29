import * as querystring from "querystring";
import { View } from "@app/interface";

/**
 * @returns key1=value1&key2=value2
 */
export const appendQueryParams = (query: View.PageQueryParams): string => {
  const searchParams = new URLSearchParams(window.location.search);
  const params = {};
  searchParams.forEach((v, k) => {
    params[k] = v;
  });
  Object.entries(query).forEach(([key, value]) => {
    if (!value || value === "") {
      delete params[key];
    } else {
      params[key] = value;
    }
  });
  return querystring.stringify(params);
};

export const updateQueryStringParameter = (key: keyof View.PageQueryParams, value: string): void => {
  const q = appendQueryParams({ [key]: value });
  history.replaceState(null, document.title, `?${q}`);
};

export const generateBaseQueryParams = (): View.PageQueryParams => {
  const searchParams = new URLSearchParams(window.location.search);
  return {
    q: searchParams.get("q") || undefined,
    name: undefined,
    hostname: undefined,
    owner: undefined,
    repo: undefined,
    path: undefined,
  };
};
