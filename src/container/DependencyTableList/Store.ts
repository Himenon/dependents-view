import * as Domain from "@app/domain";

export const generateStore = (domainStores: Domain.Stores) => {
  const searchParams = domainStores.app.state.searchParams;
  if (!searchParams.name) {
    return undefined;
  }
  const library = domainStores.app.state.displayLibrary;
  if (!library || Array.isArray(library)) {
    return undefined;
  }
  return {
    library,
  };
};

export type Store = ReturnType<typeof generateStore>;
