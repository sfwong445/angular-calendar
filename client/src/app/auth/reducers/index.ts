import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from "@ngrx/store";
import * as fromAuth from "./auth";

export interface AuthState {
  status: fromAuth.State;
}

export const reducers: ActionReducerMap<AuthState> = {
  status: fromAuth.reducer
};

export const selectAuthState = (state: AuthState) => state.status;
export const getLoggedIn = createSelector(selectAuthState, fromAuth.getLoggedIn);
export const getUser = createSelector(selectAuthState, fromAuth.getUser);