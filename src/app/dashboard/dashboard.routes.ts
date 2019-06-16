import { Routes } from '@angular/router';
import { StatisticComponent } from '../ingress-egress/statistic/statistic.component';
import { IngressEgressComponent } from '../ingress-egress/ingress-egress.component';
import { DetailComponent } from '../ingress-egress/detail/detail.component';

export const dashboardRoutes: Routes = [
    { path: '', component: StatisticComponent },
    { path: 'ingress-egress', component: IngressEgressComponent },
    { path: 'detail', component: DetailComponent },
];