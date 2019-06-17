import { Component, OnInit } from '@angular/core';
import { IngressEgressService } from '../ingress-egress/ingress-egress.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  constructor(public ingressEgressService: IngressEgressService) { }

  ngOnInit() {
    this.ingressEgressService.initIngressEgressListener();
  }

}
