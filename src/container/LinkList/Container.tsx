import { Store } from "./Store";
import { LinkList } from "@app/component";
import { QueryParams } from "@app/infra";
import { View } from "@app/interface";

export const generateProps = (store: Store): LinkList.Props | undefined => {
  if (!store) {
    return undefined;
  }
  return {
    heading: {
      children: "Package List",
    },
    links: store.menu.items.map(lib => {
      const params: View.PageQueryParams = QueryParams.generateBaseQueryParams();
      if (store.canShowDetail) {
        params["repo"] = lib.repo.name;
        params["path"] = lib.source.path;
      }
      const queryParams = "?" + QueryParams.appendQueryParams(params);
      const to = "/packages/" + lib.package.name + queryParams;
      return {
        link: {
          to,
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
