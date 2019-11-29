import { View, OriginLibrary } from "@app/interface";

export const isViewLibrary = (displayLibrary: View.Library | OriginLibrary[] | undefined): displayLibrary is View.Library => {
  if (!displayLibrary) {
    return false;
  }
  if (Array.isArray(displayLibrary)) {
    return false;
  }
  return true;
};
