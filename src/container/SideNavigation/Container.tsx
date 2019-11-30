import { Store } from "./Store";
import { SideNavigation } from "@app/component";
import { QueryParams } from "@app/infra";

export const generateProps = (store: Store): SideNavigation.Props => {
  return {
    heading: {
      children: "Package List",
      to: "/packages",
      onClick: () => {
        store.updatePageParams(undefined);
      },
    },
    detailLinks: store.menu.items.map(lib => {
      const params = QueryParams.generateBaseQueryParams();
      const queryParams = "?" + QueryParams.appendQueryParams(params);
      const to = "/packages/" + lib.package.name + queryParams;
      return {
        link: {
          to,
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
      onChange: event => {
        store.updateSearchParams(event.currentTarget.value);
      },
    },
  };
};
