import * as App from "./App";
export { App };

export interface Reducers {
  app: App.Reducer;
}

export interface Stores {
  app: {
    state: App.State;
    dispatch: App.Dispatch;
  };
}

export const createReducers = (sourcePath?: string): Reducers => {
  return {
    app: App.createReducer(sourcePath),
  };
};
