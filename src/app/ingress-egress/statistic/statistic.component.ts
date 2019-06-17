import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import { IngressEgress } from '../ingress-egress.models';
import { Label, MultiDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';

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

  constructor(private store: Store<AppState>) { }

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
