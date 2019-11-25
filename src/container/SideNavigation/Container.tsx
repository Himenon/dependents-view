import { Store } from "./Store";
import { SideNavigation } from "@app/component";

export const generateProps = (store: Store): SideNavigation.Props => {
  return {
    heading: {
      children: "Package List",
      href: "/",
      onClick: () => {
        store.setTargetDependencySourcePath(undefined);
      },
    },
    links: store.libraries.map(lib => {
      return {
        href: process.env.PUBLIC_PATH + "?sourcePath=" + lib.sourceUrl,
        children: lib.packageName,
        replace: false,
        onClick: () => {
          store.setTargetDependencySourcePath(lib.sourceUrl);
        },
      };
    }),
    searchInput: {
      type: "text",
      placeholder: "search package name",
      "aria-label": "search package name",
      value: store.searchPackageName,
      onChange: event => {
        store.updateSearchPackageSourcePath(event.currentTarget.value);
      },
    },
  };
};
