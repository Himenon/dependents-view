import { Store } from "./Store";
import { LinkList } from "@app/component";

export const generateProps = (store: Store): LinkList.Props => {
  return {
    heading: {
      children: "Package List",
    },
    links: store.libraries.map(lib => {
      return {
        href: process.env.PUBLIC_PATH + "?sourcePath=" + lib.sourceUrl,
        children: lib.packageName,
        onClick: () => {
          store.setTargetDependencySourceUrl(lib.sourceUrl);
        },
      };
    }),
  };
};
