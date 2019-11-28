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
    links: store.menu.items.map(lib => {
      return {
        href: process.env.PUBLIC_PATH + "?name=" + lib.name,
        children: lib.name,
        replace: false,
        onClick: () => {
          store.updatePageParams(lib.name);
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
