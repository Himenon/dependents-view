import * as Domain from "@app/domain";

export const generateStore = (domainStores: Domain.Stores) => {
  const pageParams = domainStores.app.state.pageParams;
  if (!pageParams.name) {
    return undefined;
  }
  const library = domainStores.app.state.displayLibrary;
  if (!library || Array.isArray(library)) {
    return undefined;
  }
  // 1つに絞り込めた場合でもpageParamsのnameと異なる場合は非表示にする
  if (pageParams.name !== library.package.name) {
    return undefined;
  }
  return {
    library,
  };
};

export type Store = ReturnType<typeof generateStore>;
