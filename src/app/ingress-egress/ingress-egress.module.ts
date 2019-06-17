import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { IngressEgressComponent } from '../ingress-egress/ingress-egress.component';
import { StatisticComponent } from '../ingress-egress/statistic/statistic.component';
import { DetailComponent } from '../ingress-egress/detail/detail.component';
import { SortIngressEgressPipe } from '../ingress-egress/sort-ingress-egress.pipe';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { ingressEgressReducer } from './ingress-egress.reducers';


@NgModule({
  declarations: [
    DashboardComponent,
    IngressEgressComponent,
    StatisticComponent,
    DetailComponent,
    SortIngressEgressPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChartsModule,
    SharedModule,
    DashboardRoutingModule,
    StoreModule.forFeature('ingressEgress', ingressEgressReducer)
  ]
})
export class IngressEgressModule { }
