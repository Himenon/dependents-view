import { State } from "./State";
import { View } from "@app/interface";

export const isViewLibrary = (displayLibrary: State["displayLibrary"]): displayLibrary is View.Library => {
  if (!displayLibrary) {
    return false;
  }
  if (Array.isArray(displayLibrary)) {
    return false;
  }
  return true;
};
