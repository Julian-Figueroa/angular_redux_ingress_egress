import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { IngressEgress } from '../ingress-egress.models';
import { Subscription } from 'rxjs';
import { IngressEgressService } from '../ingress-egress.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styles: []
})
export class DetailComponent implements OnInit, OnDestroy {

  items: IngressEgress[];

  subscription: Subscription = new Subscription();

  constructor(private store: Store<AppState>, public ieService: IngressEgressService) { }

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
