import { DependencySet, OriginLibrary, OriginDependencyData, View } from "@app/interface";

export const convertDepsDataSetToLibraries = (depsDataSet: DependencySet): View.Menu => {
  return {
    items: depsDataSet.libraries,
  };
};

export const convertOriginDependencyDataToDetailDependencyData = (
  deps: OriginDependencyData,
  libraries: OriginLibrary[],
): View.DetailDependencyData => {
  const d = libraries.find(lib => {
    return lib.package.name === deps.name && new URL(deps.url).hostname === new URL(lib.repo.url).hostname;
  });
  if (!d) {
    throw new Error("Not found");
  }
  return {
    required: deps.required,
    source: d.source,
    repo: d.repo,
    package: d.package,
  };
};

export const convertLibrariesToDisplayLibrary = (pageParams: View.PageParams, originLibraries: OriginLibrary[]): View.Library | undefined => {
  const libraries = originLibraries.filter(lib => {
    return [
      pageParams.name === lib.package.name,
      pageParams.hostname === new URL(lib.repo.url).hostname,
      pageParams.owner === lib.repo.owner,
      pageParams.repo === lib.repo.name,
      pageParams.path === lib.source.path,
    ].some(Boolean);
  });
  if (libraries.length !== 1) {
    return undefined;
  }
  const mainLibrary = libraries[0];
  const dependencies = mainLibrary.dependencies.map(deps => convertOriginDependencyDataToDetailDependencyData(deps, originLibraries));
  const devDependencies = mainLibrary.devDependencies.map(deps => convertOriginDependencyDataToDetailDependencyData(deps, originLibraries));
  return {
    ...mainLibrary,
    dependencies,
    devDependencies,
  };
};

/**
 * @returns key1:value1+key2:value2+key3:value3 || ""
 */
export const convertSearchParamToQueryParams = (searchParams: View.SearchParams): string => {
  if (Object.values(searchParams).every(value => !value || value === "")) {
    return "";
  }
  const value = Object.keys(searchParams)
    .map(key => `${key}:${searchParams[key]}`)
    .join("+");
  return value;
};
