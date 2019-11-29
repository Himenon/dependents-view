import * as Domain from "@app/domain";

export const generateStore = (domainStores: Domain.Stores) => {
  const pageParams = domainStores.app.state.pageParams;
  const library = domainStores.app.state.displayLibrary;
  if (!library) {
    return undefined;
  }
  // 1つに絞り込めた場合でもpageParamsのnameと異なる場合は非表示にする
  if (pageParams.name !== library.package.name) {
    return undefined;
  }
  console.log("絞り込めたよ");
  return {
    library,
  };
};

export type Store = ReturnType<typeof generateStore>;
