import * as Domain from "@app/domain";

export const generateStore = (domainStores: Domain.Stores) => {
  const sourceUrl = domainStores.app.state.sourcePath;
  if (!sourceUrl) {
    return undefined;
  }
  const dep = domainStores.app.state.deps.libraries.find(lib => lib.sourceUrl === sourceUrl);
  if (!dep) {
    return undefined;
  }
  return {
    libraryDisplayName: dep.packageName,
    libraryVersion: dep.latest === "" ? "Not found" : dep.latest,
    libraryUrl: dep.sourceUrl,
    libraryDescription: dep.description,
    repositoryUrl: dep.repoUrl,
    repositoryName: dep.repoName,
    updatedAt: dep.createdAt,
    deps: dep.dependencies,
    devDeps: dep.devDependencies,
  };
};

export type Store = ReturnType<typeof generateStore>;
