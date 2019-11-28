import { DependencySet } from "@app/interface";

export const filterPackageName = (inputName: string | undefined, dependencySet: DependencySet): DependencySet => {
  if (!inputName || inputName === "") {
    return dependencySet;
  }
  const filterName = inputName.toUpperCase();
  return {
    meta: dependencySet.meta,
    libraries: dependencySet.libraries.filter(lib => lib.package.name.toUpperCase().indexOf(filterName) > -1),
  };
};
