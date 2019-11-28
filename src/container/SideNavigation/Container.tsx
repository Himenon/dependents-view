import { Store } from "./Store";
import { SideNavigation } from "@app/component";

export const generateProps = (store: Store): SideNavigation.Props => {
  return {
    heading: {
      children: "Package List",
      href: "/",
      onClick: () => {
        store.updatePageParams(undefined);
      },
    },
    detailLinks: store.menu.items.map(lib => {
      return {
        link: {
          href: process.env.PUBLIC_PATH + "?name=" + lib.package.name,
          children: lib.package.name,
          replace: false,
          onClick: () => {
            store.updatePageParams(lib.package.name);
          },
        },
      };
    }),
    searchInput: {
      type: "text",
      placeholder: "search package name",
      "aria-label": "search package name",
      value: store.searchParams.name,
      onChange: event => {
        store.updateSearchParams(event.currentTarget.value);
      },
    },
  };
};
