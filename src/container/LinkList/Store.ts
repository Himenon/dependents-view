import * as Domain from "@app/domain";

export const generateStore = (domainStores: Domain.Stores) => {
  return {
    menu: domainStores.app.state.menu,
    updatePageParams: (name: string | undefined) => {
      domainStores.app.dispatch({ type: "UPDATE_PAGE_PARAMS", pageParams: { name } });
    },
  };
};

export type Store = ReturnType<typeof generateStore>;
