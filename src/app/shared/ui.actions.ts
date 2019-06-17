import { Action } from '@ngrx/store';

export const ACTIVATE_LOADING = '[UI Loading] Activate loading';
export const DEACTIVATE_LOADING = '[UI Loading] Deactivate loading';

export class ActivateLoadingAction implements Action {
    readonly type = ACTIVATE_LOADING;
}

export class DeactivateLoadingAction implements Action {
    readonly type = DEACTIVATE_LOADING;
}

export type Actions = ActivateLoadingAction | DeactivateLoadingAction;
