import { Store } from "./Store";
import { LinkList } from "@app/component";

export const generateProps = (store: Store): LinkList.Props => {
  return {
    heading: {
      children: "Package List",
    },
    links: store.menu.items.map(lib => {
      return {
        href: process.env.PUBLIC_PATH + "?name=" + lib.name,
        children: lib.name,
        onClick: () => {
          store.updateSearchParams(lib.name);
        },
      };
    }),
  };
};
