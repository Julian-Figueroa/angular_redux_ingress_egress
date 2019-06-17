import * as fromIE from './ingress-egress.actions';
import { IngressEgress } from './ingress-egress.models';
import { AppState } from '../app.reducer';

export interface IEState {
    items: IngressEgress[]
}

export interface AppState extends AppState {
    ingressEgress: IEState;
}

const initState: IEState = {
    items: []
};

export function ingressEgressReducer(state = initState, action: fromIE.Actions): IEState {
    switch (action.type) {
        case fromIE.SET_ITEMS:

            return {
                items: [
                    ...action.items.map(item => {
                        return {
                            ...item
                        };
                    })
                ]
            };

        case fromIE.UNSET_ITEMS:

            return {
                items: []
            };

        default:
            return state;
    }
}