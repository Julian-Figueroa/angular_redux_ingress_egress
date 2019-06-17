import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngressEgress } from './ingress-egress.models';
import { IngressEgressService } from './ingress-egress.service';

import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ActivateLoadingAction, DeactivateLoadingAction } from '../shared/ui.actions';
import * as fromIngresEgress from './ingress-egress.reducers';

@Component({
  selector: 'app-ingress-egress',
  templateUrl: './ingress-egress.component.html',
  styles: []
})
export class IngressEgressComponent implements OnInit, OnDestroy {

  form: FormGroup;
  type = 'ingress';
  loadingSubs: Subscription = new Subscription();
  loading: boolean;

  constructor(public ingressEgressService: IngressEgressService, private store: Store<fromIngresEgress.AppState>) { }

  ngOnInit() {
    this.loadingSubs = this.store.select('ui')
      .subscribe(ui => this.loading = ui.isLoading);

    this.form = new FormGroup({
      'amount': new FormControl(0, Validators.min(1)),
      'description': new FormControl('', Validators.required),
    });
  }

  ngOnDestroy() {
    this.loadingSubs.unsubscribe();
  }

  createForm() {
    this.store.dispatch(new ActivateLoadingAction());
    const ingressEgress = new IngressEgress({
      ...this.form.value,
      type: this.type
    });

    this.ingressEgressService.createIngressEgress(ingressEgress)
      .then(() => {
        Swal.fire({
          type: 'success',
          title: 'Created',
          text: ingressEgress.description
        });

        this.form.reset({
          amount: 0,
        });
        this.store.dispatch(new DeactivateLoadingAction());
      })
      .catch();
  }

}
