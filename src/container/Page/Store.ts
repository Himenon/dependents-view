import * as Domain from "@app/domain";
import * as DependencyTableList from "../DependencyTableList";
import * as SideNavigation from "../SideNavigation";
import * as LinkList from "../LinkList";

export const generateStore = (domainStores: Domain.App.Stores) => {
  return {
    dependencyTableList: DependencyTableList.generateStore(domainStores),
    sideNavigation: SideNavigation.generateStore(domainStores),
    linkList: LinkList.generateStore(domainStores),
  };
};

export type Store = ReturnType<typeof generateStore>;
