import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IngressEgress } from '../ingress-egress.models';
import { ChartType } from 'chart.js';

import * as fromIngresEgress from '../ingress-egress.reducers';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styles: []
})
export class StatisticComponent implements OnInit {

  ingresses: number;
  egresses: number;

  numberIngresses: number;
  numberEgresses: number;

  public doughnutChartLabels: string[] = ['Ingresses', 'Egresses'];
  public doughnutChartData: number[] = [];
  public doughnutChartType: ChartType = 'doughnut';

  subcription: Subscription = new Subscription();

  constructor(private store: Store<fromIngresEgress.AppState>) { }

  ngOnInit() {
    this.subcription = this.store.select('ingressEgress')
      .subscribe(ie => {
        this.countingIngressesEgresses(ie.items);
      });
  }

  countingIngressesEgresses(items: IngressEgress[]) {
    this.ingresses = 0;
    this.egresses = 0;

    this.numberEgresses = 0;
    this.numberIngresses = 0;

    items.forEach(item => {
      if (item.type === 'ingress') {
        this.numberIngresses++;
        this.ingresses += item.amount;
      } else {
        this.numberEgresses++;
        this.egresses += item.amount;
      }
    });

    this.doughnutChartData = [this.ingresses, this.egresses];
  }

}
