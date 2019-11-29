import { Store } from "./Store";
import { LinkList } from "@app/component";
import { QueryParams } from "@app/infra";
import { View } from "@app/interface";

export const generateProps = (store: Store): LinkList.Props => {
  return {
    heading: {
      children: "Package List",
    },
    links: store.menu.items.map(lib => {
      const params: View.PageQueryParams = QueryParams.generateBaseQueryParams();
      params["name"] = lib.package.name;
      if (store.canShowDetail) {
        params["repo"] = lib.repo.name;
      }
      const queryParams = "?" + QueryParams.appendQueryParams(params);
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
