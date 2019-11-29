import * as querystring from "querystring";

/**
 * @returns key1=value1&key2=value2
 */
export const appendQueryParams = (query: { [key: string]: string }): string => {
  const searchParams = new URLSearchParams(window.location.search);
  const params = {};
  searchParams.forEach((v, k) => {
    params[k] = v;
  });
  Object.entries(query).forEach(([key, value]) => {
    if (value === "") {
      delete params[key];
    } else {
      params[key] = value;
    }
  });
  return querystring.stringify(params);
};

export const updateQueryStringParameter = (key: string, value: string): void => {
  const q = appendQueryParams({ [key]: value });
  history.replaceState(null, document.title, `?${q}`);
};
