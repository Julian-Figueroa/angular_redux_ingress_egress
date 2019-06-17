import { ActionReducerMap } from '@ngrx/store';
import * as fromUIActions from './shared/ui.reducers';
import * as fromAuthActions from './auth/auth.reducers';
import * as fromIE from './ingress-egress/ingress-egress.reducers';

export interface AppState {
    ui: fromUIActions.State;
    auth: fromAuthActions.AuthState;
    ingressEgress: fromIE.IEState;
}

export const appReducers: ActionReducerMap<AppState> = {
    ui: fromUIActions.uiReducer,
    auth: fromAuthActions.authReducer,
    ingressEgress: fromIE.ingressEgressReducer,
};