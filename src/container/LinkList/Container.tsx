import { Store } from "./Store";
import { LinkList } from "@app/component";

export const generateProps = (store: Store): LinkList.Props => {
  const showDetail = store.menu.items.length < 5;
  return {
    heading: {
      children: "Package List",
    },
    links: store.menu.items.map(lib => {
      return {
        link: {
          href: process.env.PUBLIC_PATH + "?name=" + lib.package.name,
          children: lib.package.name,
          onClick: () => {
            store.updatePageParams(lib.package.name);
          },
        },
        detail: (showDetail || undefined) && {
          children: lib.source.url,
        },
      };
    }),
  };
};
