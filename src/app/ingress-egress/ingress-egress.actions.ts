import { Action } from '@ngrx/store';
import { IngressEgress } from './ingress-egress.models';

export const SET_ITEMS = '[Ingress Egress] Set Items';
export const UNSET_ITEMS = '[Ingress Egress] unSet Items';

export class SetItemsAction implements Action {
    readonly type = SET_ITEMS;

    constructor(public items: IngressEgress[]) { }
}

export class UnsetItemsAction implements Action {
    readonly type = UNSET_ITEMS;

}

export type Actions = SetItemsAction | UnsetItemsAction;