import { Store } from "./Store";
import { LinkList } from "@app/component";
import { QueryParams } from "@app/infra";

export const generateProps = (store: Store): LinkList.Props => {
  return {
    heading: {
      children: "Package List",
    },
    links: store.menu.items.map(lib => {
      const queryParams = "?" + QueryParams.appendQueryParams("name", lib.package.name);
      return {
        link: {
          href: process.env.PUBLIC_PATH + queryParams,
          children: lib.package.name,
          onClick: () => {
            store.updatePageParams(lib.package.name);
          },
        },
        detail: (store.canShowDetail || undefined) && {
          children: lib.source.url,
        },
      };
    }),
  };
};
