import * as Domain from "@app/domain";

export const generateStore = (domainStores: Domain.Stores) => {
  const name = domainStores.app.state.name;
  if (!name) {
    return undefined;
  }
  const dep = domainStores.app.state.deps[name];
  if (!dep) {
    return undefined;
  }
  return {
    libraryDisplayName: name,
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
