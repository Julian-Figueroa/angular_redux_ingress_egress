import { Pipe, PipeTransform } from '@angular/core';
import { IngressEgress } from './ingress-egress.models';

@Pipe({
  name: 'sortIngressEgress'
})
export class SortIngressEgressPipe implements PipeTransform {

  transform(items: IngressEgress[]): IngressEgress[] {
    return items.sort((a, b) => {
      if (a.type === 'ingress') {
        return -1;
      } else {
        return 1;
      }
    });
  }

}
