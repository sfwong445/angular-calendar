import { AuthActions, AuthActionTypes } from '../actions/auth-action';
import { Authenticate } from '../models/User';

export interface State {
    loggedIn: boolean;
    user: Authenticate | null;
}

export const initialState: State = {
    loggedIn: false,
    user: null,
}

export function reducer(state = initialState, action: AuthActions): State {
    switch (action.type) {
        case AuthActionTypes.LOGIN: {
            return Object.assign({}, state, {
                loggedIn: true,
                user: action.payload
            })
        }

        case AuthActionTypes.LOGOUT: {
            return initialState;
        }

        default: {
            return state;
        }
    }
}

export const getLoggedIn = (state: State) => state.loggedIn;
export const getUser = (state: State) => state.user;