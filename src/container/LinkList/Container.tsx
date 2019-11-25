import { Store } from "./Store";
import { LinkList } from "@app/component";

export const generateProps = (store: Store): LinkList.Props => {
  return {
    heading: {
      children: "Package List",
    },
    links: Object.keys(store.displayDependencyList).map(name => {
      return {
        href: process.env.PUBLIC_PATH + "?name=" + name,
        children: name,
        onClick: () => {
          store.setTargetDependency(name);
        },
      };
    }),
  };
};
