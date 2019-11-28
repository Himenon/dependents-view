import { DependencyTableList } from "@app/component";
import { Store } from "./Store";

export const generateProps = (store: Store): DependencyTableList.Props | undefined => {
  if (!store) {
    return undefined;
  }
  const library = store.library;
  return {
    packageDetail: {
      name: {
        href: library.source.url,
        children: library.package.name || "not selected",
      },
      version: {
        children: library.package.version,
      },
      description: {
        children: library.package.description,
      },
      repository: {
        href: library.repo.url,
        children: library.repo.fullName,
      },
    },
    dependenciesTable: {
      noDependenciesText: {
        children: "no dependencies",
      },
      rows: library.dependencies.map(dep => {
        return {
          name: {
            children: dep.package.name,
            href: dep.source.url,
          },
          version: {
            children: dep.package.version,
          },
          branch: {
            children: dep.repo.branch,
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
      rows: library.devDependencies.map(dep => {
        return {
          name: {
            children: dep.package.name,
            href: dep.source.url,
          },
          version: {
            children: dep.package.version,
          },
          branch: {
            children: dep.repo.branch,
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
