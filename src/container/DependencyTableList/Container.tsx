import { DependencyTableList } from "@app/component";
import { Store } from "./Store";

export const generateProps = (store: Store): DependencyTableList.Props | undefined => {
  if (!store) {
    return undefined;
  }
  return {
    packageDetail: {
      name: {
        href: store.libraryUrl,
        children: store.libraryDisplayName || "not selected",
      },
      version: {
        children: store.libraryVersion,
      },
      description: {
        children: store.libraryDescription,
      },
      repository: {
        href: store.repositoryUrl,
        children: store.repositoryName,
      },
      updatedAt: {
        children: store.updatedAt,
      },
    },
    dependenciesTable: {
      noDependenciesText: {
        children: "no dependencies",
      },
      rows: store.deps.map(dep => {
        return {
          name: {
            children: dep.name,
            href: dep.sourceUrl,
          },
          version: {
            children: dep.version,
          },
          branch: {
            children: dep.branch,
          },
          repo: {
            href: dep.repo.url,
            children: dep.repo.name,
          },
          required: {
            children: dep.required,
          },
        };
      }),
    },
    devDependenciesTable: {
      noDependenciesText: {
        children: "no devDependencies",
      },
      rows: store.devDeps.map(dep => {
        return {
          name: {
            children: dep.name,
            href: dep.sourceUrl,
          },
          version: {
            children: dep.version,
          },
          branch: {
            children: dep.branch,
          },
          repo: {
            href: dep.repo.url,
            children: dep.repo.name,
          },
          required: {
            children: dep.required,
          },
        };
      }),
    },
  };
};
