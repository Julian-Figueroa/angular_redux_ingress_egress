import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { IngressEgress } from '../ingress-egress.models';
import { Subscription } from 'rxjs';
import { IngressEgressService } from '../ingress-egress.service';
import * as fromIngresEgress from '../ingress-egress.reducers';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styles: []
})
export class DetailComponent implements OnInit, OnDestroy {

  items: IngressEgress[];

  subscription: Subscription = new Subscription();

  constructor(private store: Store<fromIngresEgress.AppState>, public ieService: IngressEgressService) { }

  ngOnInit() {
    this.subscription = this.store.select('ingressEgress')
      .subscribe(ie => {
        this.items = ie.items;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  deleteItem(item: IngressEgress) {
    this.ieService.deleteIngressEgress(item.uid)
      .then(() => {
        Swal.fire({
          type: 'success',
          title: 'Item deleted!',
          text: item.description
        });
      });
  }

}
