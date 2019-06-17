import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngressEgress } from './ingress-egress.models';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter, map } from 'rxjs/operators';
import { SetItemsAction, UnsetItemsAction } from './ingress-egress.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngressEgressService {

  ingressEgressListenerSubscription: Subscription = new Subscription;

  ingressEgressItemsSubscription: Subscription = new Subscription;

  constructor(private afDB: AngularFirestore, public authService: AuthService, private store: Store<AppState>) { }

  initIngressEgressListener() {

    this.ingressEgressListenerSubscription = this.store.select('auth')
      .pipe(
        filter(auth => auth.user != null)
      )
      .subscribe(auth => this.ingressEgressItems(auth.user.uid));
  }

  private ingressEgressItems(uid: string) {
    this.ingressEgressItemsSubscription = this.afDB.collection(`${uid}/ingress-egress/items`)
      .snapshotChanges()
      .pipe(
        map(docData => {
          return docData.map(doc => {
            return {
              uid: doc.payload.doc.id,
              ...doc.payload.doc.data()
            };
          });
        })
      )
      .subscribe((collection: any) => {
        this.store.dispatch(new SetItemsAction(collection));
      });
  }

  cancelSubscriptions() {
    this.ingressEgressItemsSubscription.unsubscribe();
    this.ingressEgressListenerSubscription.unsubscribe();
    this.store.dispatch(new UnsetItemsAction());
  }

  createIngressEgress(ingressEgress: IngressEgress) {
    const user = this.authService.getUser();

    return this.afDB.doc(`${user.uid}/ingress-egress`)
      .collection('items')
      .add({
        ...ingressEgress
      });
  }

  deleteIngressEgress(uid: string) {
    const user = this.authService.getUser();

    return this.afDB.doc(`${user.uid}/ingress-egress/items/${uid}`)
      .delete();
  }
}
