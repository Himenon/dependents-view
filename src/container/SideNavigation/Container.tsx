import { Store } from "./Store";
import { SideNavigation } from "@app/component";

export const generateProps = (store: Store): SideNavigation.Props => {
  return {
    heading: {
      children: "Package List",
      href: "/",
      onClick: () => {
        store.setTargetDependency(undefined);
      },
    },
    links: Object.keys(store.displayDependencyList).map(name => {
      return {
        href: process.env.PUBLIC_PATH + "?name=" + name,
        children: name,
        replace: false,
        onClick: () => {
          store.setTargetDependency(name);
        },
      };
    }),
    searchInput: {
      type: "text",
      placeholder: "search package name",
      "aria-label": "search package name",
      value: store.searchPackageName,
      onChange: event => {
        store.updateSearchPackageName(event.currentTarget.value);
      },
    },
  };
};
