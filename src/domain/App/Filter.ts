import { DependencySet } from "@app/interface";

export const filterFileName = (inputFileName: string | undefined, dependencySet: DependencySet): DependencySet => {
  if (!inputFileName) {
    return dependencySet;
  }
  const filterFileName = inputFileName.toUpperCase();
  return {
    meta: dependencySet.meta,
    libraries: dependencySet.libraries.filter(lib => lib.source.filename.toUpperCase().indexOf(filterFileName) > -1),
  };
};

export const filterRepoName = (inputRepoName: string | undefined, dependencySet: DependencySet): DependencySet => {
  if (!inputRepoName) {
    return dependencySet;
  }
  const filterRepoName = inputRepoName.toUpperCase();
  return {
    meta: dependencySet.meta,
    libraries: dependencySet.libraries.filter(lib => lib.repo.name.toUpperCase().indexOf(filterRepoName) > -1),
  };
};

export const filterIncludedPackageName = (inputName: string | undefined, dependencySet: DependencySet): DependencySet => {
  if (!inputName || inputName === "") {
    return dependencySet;
  }
  const filterName = inputName.toUpperCase();
  return {
    meta: dependencySet.meta,
    libraries: dependencySet.libraries.filter(lib => lib.package.name.toUpperCase().indexOf(filterName) > -1),
  };
};

export const filterExactlyPackageName = (inputName: string | undefined, dependencySet: DependencySet): DependencySet => {
  if (!inputName || inputName === "") {
    return dependencySet;
  }
  const filterName = inputName.toUpperCase();
  return {
    meta: dependencySet.meta,
    libraries: dependencySet.libraries.filter(lib => lib.package.name.toUpperCase() === filterName),
  };
};
