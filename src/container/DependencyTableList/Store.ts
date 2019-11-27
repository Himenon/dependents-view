import * as Domain from "@app/domain";

export const generateStore = (domainStores: Domain.Stores) => {
  const searchParams = domainStores.app.state.searchParams;
  if (!searchParams.name) {
    return undefined;
  }
  const dep = domainStores.app.state.deps.libraries.find(lib => lib.packageName === searchParams.name);
  if (!dep) {
    return undefined;
  }
  return {
    libraryDisplayName: dep.packageName,
    libraryVersion: dep.latest === "" ? "Not found" : dep.latest,
    libraryUrl: dep.sourcePath,
    libraryDescription: dep.description,
    repositoryUrl: dep.repoUrl,
    repositoryName: dep.repoName,
    updatedAt: dep.createdAt,
    deps: dep.dependencies,
    devDeps: dep.devDependencies,
  };
};

export type Store = ReturnType<typeof generateStore>;
