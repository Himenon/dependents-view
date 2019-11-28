import { DependencySet, OriginLibrary, View } from "@app/interface";

export const convertDepsDataSetToLibraries = (depsDataSet: DependencySet): View.Menu => {
  return {
    items: depsDataSet.libraries.map(lib => {
      return {
        name: lib.package.name,
      };
    }),
  };
};

export const convertLibrariesToDisplayLibrary = (depsDataSet: DependencySet): View.Library | OriginLibrary[] | undefined => {
  const filterLibrary = (name: string) => depsDataSet.libraries.filter(lib => lib.devDependencies.some(dep => dep.name === name));
  const filterLibrary2 = (name: string) => depsDataSet.libraries.filter(lib => lib.devDependencies.some(dep => dep.name === name));
  if (depsDataSet.libraries.length === 0) {
    return undefined;
  }
  if (depsDataSet.libraries.length === 1) {
    const target: OriginLibrary = depsDataSet.libraries[0];
    const dependencies: View.Library["dependencies"] = filterLibrary(target.package.name).map(lib => {
      return {
        required: "",
        package: lib.package,
        source: lib.source,
        repo: lib.repo,
      };
    });
    const devDependencies: View.Library["devDependencies"] = filterLibrary2(target.package.name).map(lib => {
      return {
        required: "",
        package: lib.package,
        source: lib.source,
        repo: lib.repo,
      };
    });
    return {
      package: target.package,
      source: target.source,
      repo: target.repo,
      dependencies,
      devDependencies,
    };
  }
  return depsDataSet.libraries;
};
