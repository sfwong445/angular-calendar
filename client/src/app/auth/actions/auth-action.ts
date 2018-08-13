import { Action } from '@ngrx/store';
import { Authenticate, User } from '../models/User';

export enum AuthActionTypes = {
    Login =  '[Auth] Login',
    Logout = '[Auth] Logout'
}

export class Login implements Action {
    readonly type = AuthActionTypes.Login;

    constructor( public payload: Authenticate ) { }
}

export class Logout implements Action {
    readonly type = AuthActionTypes.Logout;
}

export type AuthActions = Login | Logout;